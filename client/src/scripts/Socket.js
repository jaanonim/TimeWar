import {io} from "socket.io-client";
import GameManager from "./GameManager";
import MapCreator from "./MapCreator";
import {UiHandlers} from "./managers/UiHandlers";
import {runWhenExist} from "./utilities/RunWhenExist";

const environment = process.env.NODE_ENV;
const productionUrl = "/";
const developmentUrl = "http://localhost:5000/";
export default class Socket {
    static instance = null;

    constructor(room) {
        if (Socket.instance != null) return null;
        console.log("ROOM NUMBER", room);
        Socket.instance = this;
        this.socket = io(
            environment === "development" ? developmentUrl : productionUrl,
            {
                query: {
                    room: room,
                    nick: GameManager.instance.player.name
                },
            }
        );
        this.room = room;
        this.setup();
    }

    placeFigure(figure) {
        if (figure == null) return;
        this.socket.emit("placeFigure", {
            figureId: figure.figureId,
            figureType: figure.figureType,
            mapPositionX: figure.mapPositionX,
            mapPositionY: figure.mapPositionY,
        });
    }

    attackFigure(oldX, oldY, x, y) {
        this.socket.emit("attackFigure", {
            figureX: oldX,
            figureY: oldY,
            x: x,
            y: y,
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
                data.msg.figureType,
                false
            );
        });
        this.socket.on("moveFigure", (data) => {
            let figure =
                MapCreator.instance.mapObjects[data.msg.figureX][
                    data.msg.figureY
                    ].figure;
            figure.move(data.msg.newX, data.msg.newY);

        });
        this.socket.on("attackFigure", (data) => {
            let figure =
                MapCreator.instance.mapObjects[data.msg.figureX][
                    data.msg.figureY
                    ].figure;
            figure.attack(data.msg.x, data.msg.y);
        });
        this.socket.on("startGame", async (data) => {
            let player = GameManager.instance.player;
            player.setTeam(data.team);
            player.setSupply(data.player.supplies);
            player.setWinProgress(data.player.winProgress);
            GameManager.instance.setTurn(data.turn);
            GameManager.instance.labId = data.labId;
            GameManager.instance.loadFigures(data.figures);
            GameManager.instance.winTarget = data.winTarget;
            UiHandlers.instance.changeWinTargetBar();
            await runWhenExist(UiHandlers.instance.setVersusInfo, () => UiHandlers.instance.setVersusInfo(data.player.nick, data.opponentNick));
            MapCreator.instance.setMap(data.mapStruct);
            await GameManager.instance.startGame();
            MapCreator.instance.recreateMap(data.mapObjects);
            GameManager.instance.capturingOperations();
        });
        this.socket.on("endGame", (data) => {
            UiHandlers.instance.setEndPanel(true, data.who === GameManager.instance.player.team);
        });
        this.socket.on("changeTurn", (turn) => {
            GameManager.instance.setTurn(turn.msg);
        });

        this.socket.on("disconnect", () => {
            console.log("disconnect");
        });
    }
}
