const {Server} = require("socket.io");
const Room = require("./classes/Room");
let io = null;
let rooms = [];
module.exports = {
    initSockets: (server) => {
        io = new Server(server);

        io.on("connection", async (socket) => {
            let roomName = socket.handshake.query.room;
            let room = rooms.find(r => r.name === roomName);
            if (room == null) {
                room = new Room(roomName);
                await room.initMap();
                rooms.push(room);
            }
            if (room.addPlayer(socket) == null) {
                socket.disconnect();
                return;
            }

            socket.join(roomName);

            if (await room.startGame()) {
                console.log("START");
                room.redPlayer.socket.emit("startGame", {
                    "team": "RED",
                    "turn": room.turn,
                    mapStruct: room.map.mapStruct,
                    mapObjects: room.map.mapObjects,
                    figures: room.figures.getFigures(),
                    winTarget: room.winTarget
                });
                room.bluePlayer.socket.emit("startGame", {
                    "team": "BLUE",
                    "turn": room.turn,
                    mapStruct: room.map.mapStruct,
                    mapObjects: room.map.mapObjects,
                    figures: room.figures.getFigures(),
                    winTarget: room.winTarget
                });
            }
            socket.on("placeFigure", (figure) => {
                room.placeFigure(socket.id, figure);
            });
            socket.on("moveFigure", (figure) => {
                console.log(figure);
                room.moveFigure(socket.id, figure);
            });
            socket.on("endTurn", () => {
                room.endTurn(socket.id);
            });

            socket.on('disconnecting', () => {
                room.disconnectPlayer(socket.id);
                console.log("bye ", socket.id)

            });
        });

    }
};
