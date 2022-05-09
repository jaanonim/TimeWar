import FigureFactor from "./classes/FigureFactor";
import ArmyFigure from "./classes/figures/ArmyFigure";
import Player from "./classes/Player";
import {PlayerTeams} from "./enums/PlayerTeams";
import FigureManager from "./FigureManager";
import MapCreator from "./MapCreator";
import Socket from "./Socket";
import {SceneManager} from "./managers/SceneManager";
import ModelsManager from "./ModelsManager";
import {UiHandlers} from "./managers/UiHandlers";
import {MouseKeyboardManager} from "./managers/MouseKeyboardManager";

export default class GameManager {
    static _instance = null;

    static get instance() {
        if (GameManager._instance == null) {
            GameManager._instance = new GameManager();
        }
        return GameManager._instance;
    }

    constructor() {
        //TODO: Change to create player on start game
        this.player = new Player("Player", "blue");
        this.attackOption = false;
        this.turn = "";
        this.figuries = [];
        this.winTarget = 0;

        this.lastHighLight = null;
        this.selectedFigure = null;
        this.selectFigureIdInUI = null;
        this.selectFigureTypeInUI = null;
    }

    async initDisplay(displayElement) {
        await ModelsManager.loadModels();
        this.sceneManager = await (new SceneManager(displayElement));
        this.mouseKeyboardManager = new MouseKeyboardManager(displayElement);
        this.update();
        new Socket("room");
    }

    async startGame() {
        MapCreator.instance.createMap(this.sceneManager.scene);
    }

    update() {
        this.sceneManager.update();
        requestAnimationFrame(this.update.bind(this));
    }

    keyDownInteract(event) {
        if (event.key === "a") {
            if (!this.attackOption && this.selectedFigure !== null) {
                this.selectedFigure.unHighLightMovePosition();
                this.selectedFigure.highLightAttackPosition();
            }
            this.attackOption = true;
        }
    }

    keyUpInteract(event) {
        if (event.key === "a") {
            if (this.attackOption && this.selectedFigure !== null) {
                this.selectedFigure.unHighLightAttackPosition();
                this.selectedFigure.highLightMovePosition();
            }
            this.attackOption = false;
        }
    }

    loadFigures(figures) {
        FigureManager.instance.figures = figures;
        UiHandlers.instance.setFiguresOnMenu({
            landArmy: FigureManager.instance.getLandArmy(),
            airArmy: FigureManager.instance.getAirArmy(),
            buildings: FigureManager.instance
                .getBuildings()
                ?.filter((building) => building.display),
        });
    }

    endTurn() {
        this.setTurn(
            this.player.team === PlayerTeams.RED
                ? PlayerTeams.BLUE
                : PlayerTeams.RED
        );
        Socket.instance.endTurn();
        this.figuries.forEach((figure) => figure?.renew());
    }

    setTurn(turn) {
        this.turn = turn;
        UiHandlers.instance.setTurnInfo(
            this.player.team === turn ? "You Turn" : "Wait for Your Turn"
        );
        UiHandlers.instance.setIsActiveNextTurnButton(this.player.team === turn);
    }

    placeFigureAction(land) {
        if (this.selectedFigure != null) {
            this.selectedFigure.unHighLightMovePosition();
            this.selectedFigure = null;
        }
        if (this.selectFigureIdInUI == null) return;
        let figure = this.placeFigure(
            this.player.team,
            land.mapPositionX,
            land.mapPositionY,
            this.selectFigureIdInUI,
            this.selectFigureTypeInUI
        );
        Socket.instance.placeFigure(figure);
    }

    placeFigure(who, x, y, figureID, figureType) {
        let figureFactory = new FigureFactor();
        let figure = figureFactory.createFigure(
            who,
            x,
            y,
            figureID,
            figureType
        );
        this.figuries.push(figure);
        this.sceneManager.scene.add(figure);
        return figure;
    }

    selectFigure(figure) {
        if (this.selectedFigure !== null) {
            if (this.selectedFigure instanceof ArmyFigure) {
                this.selectedFigure.unHighLightMovePosition();
            }
        }
        if (figure instanceof ArmyFigure) {
            if (figure === this.selectedFigure) {
                if (this.attackOption) {
                    figure.unHighLightAttackPosition();
                } else {
                    figure.unHighLightMovePosition();
                }
                this.selectedFigure = null;
            } else {
                if (figure.who !== GameManager.instance.player.team) return;
                if (this.attackOption) {
                    figure.highLightAttackPosition();
                } else {
                    figure.highLightMovePosition();
                }
                this.selectedFigure = figure;
            }
        }
    }

    removeFigure(x, y) {
        this.sceneManager.scene.remove(MapCreator.instance.mapObjects[x][y].figure);
        MapCreator.instance.mapObjects[x][y].figure = null;
    }
}
