import * as THREE from "three";
import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls";
import FigureFactor from "./classes/FigureFactor";
import ArmyFigure from "./classes/figures/ArmyFigure";
import {HighLightType} from "./enums/HighLightType";
import Socket from "./Socket";
import MapLand from "./classes/MapLand";
import Player from "./classes/Player";
import MapCreator from "./MapCreator";
import ModelsManager from "./ModelsManager";
import {PlayerTeams} from "./enums/PlayerTeams";


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
        this.selectFigureIdInUI = null;
        this.selectFigureTypeInUI = null;
        this.turn = "";
        this.figuries = [];
        this.setTurnInfo = null;
        this.setIsActiveNextTurnButton = null;
    }

    async initDisplay(displayElement) {
        await ModelsManager.loadModels();

        //Initialization Scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        displayElement.innerHTML = "";
        displayElement.appendChild(this.renderer.domElement);
        MapCreator.instance.createMap(this.scene);

        //light
        const light = new THREE.DirectionalLight(0xffffff, 4, 100);
        light.position.set(10, 20, 10);
        light.castShadow = true;
        this.scene.add(light);

        const shadowSize = 100;
        light.shadow.blurSamples = 1;
        light.shadow.mapSize.width = 8192;
        light.shadow.mapSize.height = 8192;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 100;
        light.shadow.camera.left = -shadowSize;
        light.shadow.camera.right = shadowSize;
        light.shadow.camera.top = shadowSize;
        light.shadow.camera.bottom = -shadowSize;

        //Helpers
        this.cameraConrols = new OrbitControls(this.camera, this.renderer.domElement);
        this.camera.position.y = 25;
        this.camera.position.z = 35;
        this.update();
        const helper = new THREE.CameraHelper(light.shadow.camera);
        this.scene.add(helper);

        //Add Listener for resizing screen
        window.addEventListener("resize", this.onWindowResize.bind(this));
        displayElement.addEventListener("mousedown", this.mouseClickInteration.bind(this));
        displayElement.addEventListener("mousemove", this.highlighting.bind(this));
        new Socket("room");
    }

    update() {
        requestAnimationFrame(this.update.bind(this));
        this.cameraConrols.update();
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onSelectFigureInUI(newId, type) {
        this.selectFigureIdInUI = newId;
        this.selectFigureTypeInUI = type;
    }


    highlighting(event) {
        const raycaster = new THREE.Raycaster();
        const mouseVector = new THREE.Vector2();
        mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouseVector, this.camera);
        const intersects = raycaster.intersectObjects(this.scene.children);
        if (this.lastHighLight !== null)
            this.lastHighLight.unHighLight();
        this.lastHighLight = null;
        if (intersects.length > 0) {
            let intersectLand = intersects.find(obj => obj.object?.parent instanceof MapLand);
            if (intersectLand !== undefined) {
                this.lastHighLight = intersectLand.object.parent;
                this.lastHighLight.highLight();
            }
        }
    }

    mouseClickInteration(event) {
        if (event.button === 0) {
            if (this.turn !== this.player.team) return;
            const raycaster = new THREE.Raycaster();
            const mouseVector = new THREE.Vector2();
            mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouseVector, this.camera);
            const intersects = raycaster.intersectObjects(this.scene.children);
            if (intersects.length > 0) {
                let intersectLand = intersects.find(obj => obj.object?.parent instanceof MapLand);
                if (intersectLand !== undefined) {
                    let land = intersectLand.object.parent;
                    //TODO: change to create selected object
                    if (land.figure !== null) {
                        this.selectFigure(land);
                        return;
                    }
                    if (this.selectedFigure !== undefined && land.hightLightType !== HighLightType.NONE) {
                        this.makeAction(land)
                    } else {
                        this.placeFigureAction(land);
                    }
                }
            }
        }
    }

    endTurn() {
        this.setTurn(this.player.team === PlayerTeams.RED ? PlayerTeams.BLUE : PlayerTeams.RED);
        Socket.instance.endTurn();
        this.figuries.forEach(figure => figure?.renew());
    }

    setTurn(turn) {
        this.turn = turn;
        this.setTurnInfo(this.player.team === turn ? "You Turn" : "Wait for Your Turn");
        this.setIsActiveNextTurnButton(this.player.team === turn);
    }

    placeFigureAction(land) {
        if (this.selectedFigure != null) {
            this.selectedFigure.unHighLightMovePosition();
            this.selectedFigure = null;
        }
        if (this.selectFigureIdInUI == null) return;
        let figure = this.placeFigure(this.selectFigureIdInUI, land.mapPositionX, land.mapPositionY, this.selectFigureTypeInUI, this.player.team);
        Socket.instance.placeFigure(figure);
    }

    placeFigure(figureID, x, y, figureType, who) {

        let figureFactory = new FigureFactor();
        let figure = figureFactory.createFigure(figureID, x, y, figureType, who);
        this.figuries.push(figure);
        this.scene.add(figure);
        return figure;
    }


    makeAction(land) {
        let x = land.mapPositionX;
        let y = land.mapPositionY;
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

    moveFigure(figure, x, y) {
        let oldX = figure.mapPositionX;
        let oldY = figure.mapPositionY;
        if (figure.move(x, y)) {
            let oldLand = MapCreator.instance.mapObjects[oldX][oldY];
            oldLand.figure = null;
            return true
        }
        return false
    }

    selectFigure(land) {
        let figure = land.figure;
        if (this.selectedFigure !== null) {
            if (this.selectedFigure instanceof ArmyFigure) {
                this.selectedFigure.unHighLightMovePosition();
            }
        }
        if (figure instanceof ArmyFigure) {
            if (figure === this.selectedFigure) {
                figure.unHighLightMovePosition();
                this.selectedFigure = null;
            } else {
                if (figure.who !== GameManager.instance.player.team) return;
                figure.highLightMovePosition();
                this.selectedFigure = figure;
            }
        }
    }


}
