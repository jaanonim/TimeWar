import { Clock } from "three";
import FigureFactor from "./classes/FigureFactor";
import Player from "./classes/Player";
import { PlayerTeams } from "./enums/PlayerTeams";
import FigureManager from "./managers/FigureManager";
import LabelsManager from "./managers/LabelsManager";
import ModelsManager from "./managers/ModelsManager";
import { MouseKeyboardManager } from "./managers/MouseKeyboardManager";
import { UiHandlers } from "./managers/UiHandlers";
import MapCreator from "./MapCreator";
import { SceneInitializator } from "./SceneInitializator";
import Socket from "./Socket";
import { getRandomString } from "./utilities/Random";
export default class GameManager {
    static _instance = null;

    static get instance() {
        if (GameManager._instance == null) {
            GameManager._instance = new GameManager();
        }
        return GameManager._instance;
    }

    get camera() {
        return this.sceneManager.camera;
    }

    constructor() {
        window.GameManager = this;

        if (!sessionStorage.getItem("nick"))
            sessionStorage.setItem("nick", "Anonymous_" + getRandomString(4));

        console.log("NICK", sessionStorage.getItem("nick"));
        this.player = new Player(sessionStorage.getItem("nick"), "blue");
        this.attackOption = false;
        this.turn = "";
        this.figuries = [];
        this.winTarget = 0;
        this.labId = null;

        this.selectedFigure = null;
        this.selectFigureIdInUI = null;
        this.selectFigureTypeInUI = null;
        this.isDisplayInit = false;
        this.isInAnim = false;
        this.clock = new Clock();
    }

    startAnim() {
        this.isInAnim = true;
        UiHandlers.instance.setInAnim(true);
    }

    endAnim() {
        this.isInAnim = false;
        UiHandlers.instance.setInAnim(false);
    }

    async initDisplay(displayElement, roomCode) {
        if (!this.isDisplayInit) {
            this.isDisplayInit = true;
            await ModelsManager.loadModels();
            this.sceneManager = await new SceneInitializator(displayElement);
            this.mouseKeyboardManager = new MouseKeyboardManager(
                displayElement
            );
            this.labelsManager = await new LabelsManager(displayElement);
            this.update();
        }
        new Socket(roomCode);
    }

    update() {
        const delta = this.clock.getDelta();
        this.sceneManager.update(delta);
        requestAnimationFrame(this.update.bind(this));
    }

    setTurn(turn) {
        this.unselectFigureInUI();
        this.turn = turn;
        UiHandlers.instance.changeTurnText(this.turn);
        if (this.turn === this.player.team) {
            this.capturingOperations();
            for (let supply in this.player.supplies) {
                this.player.supplies[supply].reset();
            }
            UiHandlers.instance.updateSupply();
            this.figuries.forEach((figure) => figure?.renew());
        }
    }

    capturingOperations() {
        MapCreator.instance.unCapturingMap();
        this.figuries.forEach((figure) => {
            if (figure != null) {
                figure.capture();
            }
        });
    }

    setSelectFigureInUI(newId, type) {
        this.selectFigureIdInUI = newId;
        this.selectFigureTypeInUI = type;
        if (this.sceneManager) this.sceneManager.cursor.move();
    }

    endTurn() {
        this.setTurn(
            this.player.team === PlayerTeams.RED
                ? PlayerTeams.BLUE
                : PlayerTeams.RED
        );
        Socket.instance.endTurn();
        this.unselectFigureInUI();
    }

    loadFigures(figures) {
        this.figuries = [];
        FigureManager.instance.figures = figures;
        UiHandlers.instance.setFiguresOnMenu({
            landArmy: FigureManager.instance.getLandArmy(),
            airArmy: FigureManager.instance.getAirArmy(),
            buildings: FigureManager.instance
                .getBuildings()
                ?.filter((building) => building.display),
        });
    }

    figureCanBePlaced(land) {
        if (land.captured !== this.player.team) return null;
        if (!this.selectFigureIdInUI || !this.selectFigureTypeInUI) return null;

        let objData = FigureManager.instance.getFigure(
            this.selectFigureTypeInUI,
            this.selectFigureIdInUI
        );
        if (!land.canFigurePlace(objData)) return null;
        return { id: this.selectFigureIdInUI, type: this.selectFigureTypeInUI };
    }

    placeFigureAction(land) {
        if (this.selectedFigure != null) {
            if (this.selectedFigure.unHighLightMovePosition != null) {
                this.selectedFigure.unHighLightMovePosition();
            }
            this.selectedFigure.unselect();
            this.selectedFigure = null;
        }
        const f = this.figureCanBePlaced(land);
        if (f == null) return;
        let figure = this.placeFigure(
            this.player.team,
            land.mapPositionX,
            land.mapPositionY,
            f.id,
            f.type,
            true
        );
        if (figure) {
            Socket.instance.placeFigure(figure);
            if (!FigureFactor.canBuy(figure.data, this.selectFigureTypeInUI)) {
                this.unselectFigureInUI();
            }
        }
    }

    unselectFigureInUI() {
        if (
            this.selectFigureIdInUI != null &&
            this.selectFigureTypeInUI != null
        ) {
            UiHandlers.instance.unselectFigureInUI();
            this.selectFigureIdInUI = null;
            this.selectFigureTypeInUI = null;
        }
    }

    unselectFigure() {
        if (this.selectedFigure != null) {
            this.selectedFigure.unselect();
            this.selectedFigure = null;
        }
    }

    unselectAll() {
        this.unselectFigure();
        this.unselectFigureInUI();
    }

    placeFigure(who, x, y, figureID, figureType, isBuying) {
        let figureFactory = new FigureFactor();
        let figure = figureFactory.createFigure(
            who,
            x,
            y,
            figureID,
            figureType,
            isBuying
        );
        if (figure == null) return null;
        figure.capture();
        this.figuries.push(figure);
        this.sceneManager.scene.add(figure);
        return figure;
    }

    removeFigure(x, y) {
        let figure = MapCreator.instance.mapObjects[x][y].figure;
        this.figuries = this.figuries.filter((fig) => fig !== figure);
        figure.destroy();
        MapCreator.instance.mapObjects[x][y].figure = null;
    }

    removeFigureOnlyStrategy(x, y) {
        let figure = MapCreator.instance.mapObjects[x][y].figure;
        this.figuries = this.figuries.filter((fig) => fig !== figure);
        MapCreator.instance.mapObjects[x][y].figure = null;
        return figure;
    }

    destroy() {
        Socket.instance.destroy();
    }
}
