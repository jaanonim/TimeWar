import {io} from "socket.io-client";
import GameManager from "./GameManager";

export default class Socket {
    static instance = null;

    constructor(room) {
        Socket.instance = this;
        this.socket = io('ws://localhost:5000', {
            query: {
                room: room
            }
        });
        this.room = room;
        this.setup();
    }

    placeFigure(figure) {
        this.socket.emit("placeFigure", {
            figureId: figure.figureId,
            figureType: figure.figureType,
            mapPositionX: figure.mapPositionX,
            mapPositionY: figure.mapPositionY,
        });
    }

    setup() {
        this.socket.on("connect", () => {
            console.log("connect", this.socket.id);
        });
        this.socket.on("placeFigure", (data) => {
            console.log(data);
            GameManager.instance.placeFigure(
                data.figure.figureId,
                data.figure.mapPositionX,
                data.figure.mapPositionY,
                data.figure.figureType,
                data.who);
        });
        this.socket.on("startGame", (data) => {
            console.log("start", data);
            GameManager.instance.player.setTeam(data.team);
        });

        this.socket.on("disconnect", () => {
            console.log("disconnect");
        });
    }


}