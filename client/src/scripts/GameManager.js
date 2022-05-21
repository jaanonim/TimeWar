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
import { runWhenExist } from "./utilities/RunWhenExist";

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
        console.log("NICK", sessionStorage.getItem("nick"));
        this.player = new Player(sessionStorage.getItem("nick"), "blue");
        this.attackOption = false;
        this.turn = "";
        this.figuries = [];
        this.winTarget = 0;

        this.selectedFigure = null;
        this.selectFigureIdInUI = null;
        this.selectFigureTypeInUI = null;
        this.isDisplayInit = false;
        this.clock = new Clock();
    }

    async initDisplay(displayElement, roomCode) {
        if (this.isDisplayInit) return;
        this.isDisplayInit = true;
        await ModelsManager.loadModels();
        this.sceneManager = await new SceneInitializator(displayElement);
        this.mouseKeyboardManager = new MouseKeyboardManager(displayElement);
        this.labelsManager = await new LabelsManager(displayElement);
        this.update();
        new Socket(roomCode);
    }

    async startGame() {
        MapCreator.instance.createMap(this.sceneManager.scene);
        UiHandlers.instance.updateSupply();
        await runWhenExist(UiHandlers.instance.setInfoRoomPanel, () =>
            UiHandlers.instance.setInfoRoomPanel(false)
        );
    }

    update() {
        const delta = this.clock.getDelta();
        this.sceneManager.update(delta);
        requestAnimationFrame(this.update.bind(this));
    }

    setTurn(turn) {
        this.turn = turn;
        UiHandlers.instance.changeTurnText(this.turn);
        if (this.turn === this.player.team) {
            this.capturingOperations();
        }
    }

    capturingOperations() {
        MapCreator.instance.unCapturingMap();
        console.log(this.figuries);
        this.figuries.forEach(figure => {
            if (figure != null) {
                figure.capture();
            }
        })
    }

    endTurn() {
        this.setTurn(
            this.player.team === PlayerTeams.RED
                ? PlayerTeams.BLUE
                : PlayerTeams.RED
        );
        Socket.instance.endTurn();
        for (let supply in this.player.supplies) {
            this.player.supplies[supply].reset();
        }
        UiHandlers.instance.updateSupply();
        this.figuries.forEach((figure) => figure?.renew());

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

    placeFigureAction(land) {
        if (this.selectedFigure != null) {
            console.log(this.selectedFigure); //TODO: remove, for no it's for futhure debuging
            this.selectedFigure.unHighLightMovePosition();
            this.selectedFigure = null;
        }
        if (this.selectFigureIdInUI == null) return;
        let figure = this.placeFigure(
            this.player.team,
            land.mapPositionX,
            land.mapPositionY,
            this.selectFigureIdInUI,
            this.selectFigureTypeInUI,
            true
        );
        Socket.instance.placeFigure(figure);
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
        this.figuries.push(figure);
        this.sceneManager.scene.add(figure);
        return figure;
    }

    removeFigure(x, y) {
        let figure = MapCreator.instance.mapObjects[x][y].figure;
        figure.onDestroy();
        this.figuries = this.figuries.filter(fig => fig !== figure);
        this.sceneManager.scene.remove(figure);
        MapCreator.instance.mapObjects[x][y].figure = null;
    }
}
