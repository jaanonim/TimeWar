import {io} from "socket.io-client";
import GameManager from "./GameManager";
import MapCreator from "./MapCreator";

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

    moveFigure(oldX,oldY, x, y) {
        this.socket.emit("moveFigure", {
            figureX: oldX,
            figureY: oldY,
            newX: x,
            newY: y
        });
    }

    setup() {
        this.socket.on("connect", () => {
            console.log("connect", this.socket.id);
        });
        this.socket.on("placeFigure", (data) => {
            console.log(data);
            GameManager.instance.placeFigure(
                data.msg.figureId,
                data.msg.mapPositionX,
                data.msg.mapPositionY,
                data.msg.figureType,
                data.who);
        });
        this.socket.on("moveFigure", (data) => {
            console.log(MapCreator.instance.mapObjects, MapCreator.instance.mapObjects[data.msg.figureX][data.msg.figureY], data.msg.figureX, data.msg.figureY);
            let figure = MapCreator.instance.mapObjects[data.msg.figureX][data.msg.figureY].figure;
            GameManager.instance.moveFigure(
                figure,
                data.msg.newX,
                data.msg.newY
            );
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