const { Server } = require("socket.io");
const Room = require("./classes/Room");
require("./classes/DatabaseController");
const databaseController = require("./classes/DatabaseController");
const { runWhenUnlock } = require("./utils/asyncSync");
let io = null;
let rooms = [];

module.exports = {
    removeRoom: (room) => {
        rooms = rooms.filter((r) => r !== room);
    },
    initSockets: (server) => {
        io = new Server(server, {
            cors: {
                origin: "*",
                methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            },
        });

        io.on("connection", async (socket) => {
            let roomName = socket.handshake.query.room;
            console.log(
                "CONNECTED",
                "room:",
                roomName,
                "nick:",
                socket.handshake.query.nick
            );
            let room = await runWhenUnlock("createRoom", async () => {
                let room = rooms.find((r) => r.name === roomName);
                if (room == null) {
                    let settings = await databaseController.getDefaultSetting();
                    room = new Room(roomName, settings);
                    await room.initMap();
                    rooms.push(room);
                }
                return room;
            });

            if ((await room.addPlayer(socket)) == null) {
                socket.disconnect();
                return;
            }

            socket.join(roomName);

            if (await room.startGame()) {
                console.log("START GAME");
                room.redPlayer.socket.emit("startGame", {
                    team: "RED",
                    player: room.redPlayer.getPlayerData(),
                    turn: room.turn,
                    mapStruct: room.map.mapStruct,
                    mapObjects: room.map.mapObjects,
                    figures: room.figures.getFigures(),
                    winTarget: room.winTarget,
                    opponentNick: room.bluePlayer.nick,
                    labId: room.settings.labId,
                });
                room.bluePlayer.socket.emit("startGame", {
                    team: "BLUE",
                    player: room.bluePlayer.getPlayerData(),
                    turn: room.turn,
                    mapStruct: room.map.mapStruct,
                    mapObjects: room.map.mapObjects,
                    figures: room.figures.getFigures(),
                    winTarget: room.winTarget,
                    opponentNick: room.redPlayer.nick,
                    labId: room.settings.labId,
                });
            }
            socket.on("placeFigure", (figure) => {
                room.registerMove();
                room.placeFigure(socket.id, figure);
            });
            socket.on("moveFigure", (figure) => {
                room.registerMove();
                room.moveFigure(socket.id, figure);
            });
            socket.on("attackFigure", (figure) => {
                room.registerMove();
                room.attackFigure(socket.id, figure);
            });
            socket.on("endTurn", () => {
                room.registerMove();
                room.endTurn(socket.id);
            });

            socket.on("disconnecting", () => {
                console.log("DISCONNECTING", socket.id);
                if (!room.disconnectPlayer(socket.id)) {
                    console.log("DROP ROOM:", room.name);
                    rooms = rooms.filter((r) => r.name !== room.name);
                }
            });
        });
    },
};
