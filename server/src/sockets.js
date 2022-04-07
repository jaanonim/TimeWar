const {Server} = require("socket.io");
const Room = require("./classes/Room");
let io = null;
let rooms = [];
module.exports = {
    initSockets: (server) => {
        io = new Server(server);

        io.on("connection", (socket) => {
            let roomName = socket.handshake.query.room;
            socket.join(roomName);
            let room = rooms.find(r => r.name === roomName);
            if (room == null) {
                room = new Room(roomName);
                rooms.push(room);
            }
            if (room.addPlayer(socket) == null) {
                return;
            }

            if (room.startGame()) {
                console.log("START");
                room.redPlayer.emit("startGame", {"team": "RED"});
                room.bluePlayer.emit("startGame", {"team": "BLUE"});
            }
            socket.on("placeFigure", (figure) => {
                console.log(JSON.stringify(figure, null, 5));
                console.log(socket.id);
                room.placeFigure(socket.id, figure);
            });

            socket.on('disconnecting', () => {
                room.disconnectPlayer(socket.id);
                console.log("bye ", socket.id)

            });
        });

    }
};