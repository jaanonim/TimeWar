import { io } from "socket.io-client";
import GameManager from "./GameManager";
import MapCreator from "./MapCreator";

const environment = process.env.NODE_ENV;
const productionUrl = "/";
const developmentUrl = "http://localhost:5000/";
export default class Socket {
    static instance = null;

    constructor(room) {
        if (Socket.instance != null) return null;
        Socket.instance = this;
        this.socket = io(
            environment === "development" ? developmentUrl : productionUrl,
            {
                query: {
                    room: room,
                },
            }
        );
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

    moveFigure(oldX, oldY, x, y) {
        this.socket.emit("moveFigure", {
            figureX: oldX,
            figureY: oldY,
            newX: x,
            newY: y,
        });
    }

    endTurn() {
        this.socket.emit("endTurn");
    }

    setup() {
        this.socket.on("connect", () => {
            console.log("connect", this.socket.id);
        });
        this.socket.on("placeFigure", (data) => {
            GameManager.instance.placeFigure(
                data.who,
                data.msg.mapPositionX,
                data.msg.mapPositionY,
                data.msg.figureId,
                data.msg.figureType
            );
        });
        this.socket.on("moveFigure", (data) => {
            let figure =
                MapCreator.instance.mapObjects[data.msg.figureX][
                    data.msg.figureY
                ].figure;
            GameManager.instance.moveFigure(
                figure,
                data.msg.newX,
                data.msg.newY
            );
        });
        this.socket.on("startGame", async (data) => {
            GameManager.instance.player.setTeam(data.team);
            GameManager.instance.setTurn(data.turn);
            GameManager.instance.loadFigures(data.figures);
            GameManager.instance.winTarget = data.winTarget;
            MapCreator.instance.setMap(data.mapStruct);
            await GameManager.instance.startGame();
            MapCreator.instance.recreateMap(data.mapObjects);
        });
        this.socket.on("endGame", (data) => {
            //TODO: MAKE END GAME PANEL
            alert("WIN", data.who);
            setTimeout(() => {
                location.reload();
            }, 3000);
        });
        this.socket.on("changeTurn", (turn) => {
            GameManager.instance.setTurn(turn.msg);
        });

        this.socket.on("disconnect", () => {
            console.log("disconnect");
        });
    }
}
