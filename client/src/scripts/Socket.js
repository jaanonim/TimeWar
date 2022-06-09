import { io } from "socket.io-client";
import GameManager from "./GameManager";
import { UiHandlers } from "./managers/UiHandlers";
import MapCreator from "./MapCreator";
import { runWhenExist } from "./utilities/RunWhenExist";

const environment = process.env.NODE_ENV;
const productionUrl = "/";
const developmentUrl = "http://localhost:5000/";

export default class Socket {
    static instance = null;

    constructor(room) {
        if (Socket.instance != null) {
            if (!this.init && this.socket && !this.socket.connected) {
                this.socket.connect();
            }
            return;
        }
        this.init = true;
        console.log("ROOM NUMBER", room);
        Socket.instance = this;
        this.socket = io(
            environment === "development" ? developmentUrl : productionUrl,
            {
                query: {
                    room: room,
                    nick: GameManager.instance.player.name,
                },
            }
        );

        this.room = room;
        this.setup();
        this.waitForConnection(() => {
            this.init = false;
        });
    }

    waitForConnection(callback) {
        setTimeout(() => {
            if (this.socket.connected) {
                callback();
            } else {
                console.log("Waiting for connection...");
                this.waitForConnection(callback);
            }
        }, 100);
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
            UiHandlers.instance.setIsLoading(false);
        });

        this.socket.on("startGame", async (data) => {
            console.log("START");

            const player = GameManager.instance.player;
            player.setTeam(data.team);
            player.setSupply(data.player.supplies);
            player.setWinProgress(data.player.winProgress);

            GameManager.instance.setTurn(data.turn);
            GameManager.instance.labId = data.labId;
            GameManager.instance.loadFigures(data.figures);
            GameManager.instance.winTarget = data.winTarget;

            UiHandlers.instance.changeWinTargetBar();
            await runWhenExist(UiHandlers.instance.setVersusInfo, () =>
                UiHandlers.instance.setVersusInfo(
                    data.player.nick,
                    data.opponentNick
                )
            );

            MapCreator.instance.setMap(data.mapStruct);
            MapCreator.instance.createMap(
                GameManager.instance.sceneManager.scene
            );
            MapCreator.instance.recreateMap(data.mapObjects);
            GameManager.instance.capturingOperations();

            UiHandlers.instance.updateSupply();
            await runWhenExist(UiHandlers.instance.setInfoRoomPanel, () =>
                UiHandlers.instance.setInfoRoomPanel(false)
            );
            await runWhenExist(UiHandlers.instance.unsetDisconnectTimer, () =>
                UiHandlers.instance.unsetDisconnectTimer()
            );
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

        this.socket.on("changeTurn", (turn) => {
            GameManager.instance.setTurn(turn.msg);
        });

        this.socket.on("endGame", async (data) => {
            await runWhenExist(UiHandlers.instance.unsetDisconnectTimer, () =>
                UiHandlers.instance.unsetDisconnectTimer()
            );
            UiHandlers.instance.setEndPanel(
                true,
                data.who === GameManager.instance.player.team
            );
        });

        this.socket.on("playerDisconnect", (data) => {
            console.log(data);
            UiHandlers.instance.setDisconnectTimer(data.timer, data.nick);
        });

        this.socket.on("disconnect", () => {
            console.log("disconnect");
        });

        this.socket.on("error", (error) => {
            console.log("error", error);
        });
    }

    destroy() {
        this.socket.disconnect();
    }
}
