import * as THREE from "three";
import FigureFactor from "./classes/FigureFactor";
import ArmyFigure from "./classes/figures/ArmyFigure";
import MapLand from "./classes/MapLand";
import Player from "./classes/Player";
import {HighLightType} from "./enums/HighLightType";
import {PlayerTeams} from "./enums/PlayerTeams";
import FigureManager from "./FigureManager";
import MapCreator from "./MapCreator";
import Socket from "./Socket";
import {SceneManager} from "./managers/SceneManager";
import ModelsManager from "./ModelsManager";
import {UiHandlers} from "./managers/UiHandlers";

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
        this.lastHighLight = null;
        this.selectedFigure = null;
        this.attackOption = false;
        this.selectFigureIdInUI = null;
        this.selectFigureTypeInUI = null;
        this.turn = "";
        this.figuries = [];
        this.winTarget = 0;
    }

    async initDisplay(displayElement) {
        await ModelsManager.loadModels();
        this.sceneManager = await (new SceneManager(displayElement));

        this.update();
        displayElement.addEventListener(
            "mousedown",
            this.mouseClickInteract.bind(this)
        );
        window.addEventListener("keydown", this.keyDownInteract.bind(this));
        window.addEventListener("keyup", this.keyUpInteract.bind(this));
        displayElement.addEventListener(
            "mousemove",
            this.highlighting.bind(this)
        );
        new Socket("room");
    }

    async startGame() {
        MapCreator.instance.createMap(this.sceneManager.scene);
    }

    update() {
        this.sceneManager.update();
        requestAnimationFrame(this.update.bind(this));
    }

    highlighting(event) {
        const raycaster = new THREE.Raycaster();
        const mouseVector = new THREE.Vector2();
        mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouseVector, this.sceneManager.camera);
        const intersects = raycaster.intersectObjects(this.sceneManager.scene.children);
        if (this.lastHighLight !== null) this.lastHighLight.unHighLight();
        this.lastHighLight = null;
        if (intersects.length > 0) {
            let intersectLand = intersects.find(
                (obj) => obj.object?.parent instanceof MapLand
            );
            if (intersectLand !== undefined) {
                this.lastHighLight = intersectLand.object.parent;
                if (this.turn === this.player.team)
                    this.lastHighLight.highLight();
            }
        }
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

    mouseClickInteract(event) {
        if (event.button === 0) {
            if (this.turn !== this.player.team) return;
            const raycaster = new THREE.Raycaster();
            const mouseVector = new THREE.Vector2();
            mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouseVector, this.sceneManager.camera);
            const intersects = raycaster.intersectObjects(this.sceneManager.scene.children);
            if (intersects.length > 0) {
                let intersectLand = intersects.find(
                    (obj) => obj.object?.parent instanceof MapLand
                );
                if (intersectLand !== undefined) {
                    let land = intersectLand.object.parent;
                    if (land.figure !== null && !this.attackOption) {
                        this.selectFigure(land.figure);
                        return;
                    }
                    if (
                        this.selectedFigure !== undefined &&
                        land.hightLightType !== HighLightType.NONE
                    ) {
                        this.makeAction(land);
                    } else {
                        this.placeFigureAction(land);
                    }
                }
            }
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

    makeAction(land) {
        let x = land.mapPositionX;
        let y = land.mapPositionY;
        if (this.attackOption) {
            if (this.selectedFigure.canAttack(x, y)) {
                this.selectedFigure.unHighLightAttackPosition();
                let oldX = this.selectedFigure.mapPositionX;
                let oldY = this.selectedFigure.mapPositionY;
                if (this.selectedFigure.attack(x, y)) {
                    Socket.instance.attackFigure(oldX, oldY, x, y);
                }
                this.selectedFigure = null;
            }
        } else {
            if (this.selectedFigure.canMove(x, y)) {
                this.selectedFigure.unHighLightMovePosition();
                let oldX = this.selectedFigure.mapPositionX;
                let oldY = this.selectedFigure.mapPositionY;
                if (this.moveFigure(this.selectedFigure, x, y)) {
                    Socket.instance.moveFigure(oldX, oldY, x, y);
                }
                this.selectedFigure = null;
            }
        }
    }

    moveFigure(figure, x, y) {
        let oldX = figure.mapPositionX;
        let oldY = figure.mapPositionY;
        if (figure.move(x, y)) {
            let oldLand = MapCreator.instance.mapObjects[oldX][oldY];
            oldLand.figure = null;
            return true;
        }
        return false;
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
