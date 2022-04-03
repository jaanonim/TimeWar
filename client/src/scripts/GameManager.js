import MapCreator from "./MapCreator";
import * as THREE from "three";
import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls";
import Player from "./classes/Player";
import MapLand from "./classes/MapLand";
import FigureFactor from "./classes/FigureFactor";
import {FigureTypes} from "./enums/FigureTypes";
import ModelsManager from "./ModelsManager";


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
    }

    async initDisplay(displayElement) {
        await ModelsManager.loadModels();

        //Initialization Scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        displayElement.innerHTML = "";
        displayElement.appendChild(this.renderer.domElement);
        MapCreator.instance.createMap(this.scene);

        //light
        const light = new THREE.DirectionalLight(0xffffff, 4);
        light.rotateX(45 * Math.PI / 180);
        this.scene.add(light);

        //Helpers
        this.cameraConrols = new OrbitControls(this.camera, this.renderer.domElement);
        const gridHelper = new THREE.GridHelper(100, 100);
        this.scene.add(gridHelper);
        this.camera.position.y = 25;
        this.camera.position.z = 35;
        this.update();

        //Add Listener for resizing screen
        window.addEventListener("resize", this.onWindowResize.bind(this));
        displayElement.addEventListener("mousedown", this.raycasting.bind(this));
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

    raycasting(event) {
        if (event.button === 0) {
            const raycaster = new THREE.Raycaster();
            const mouseVector = new THREE.Vector2();
            mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouseVector, this.camera);
            const intersects = raycaster.intersectObjects(this.scene.children);
            console.log(intersects.length);
            if (intersects.length > 0) {
                let intersectLand = intersects.find(obj => obj.object instanceof MapLand);
                if (intersectLand !== undefined) {
                    let land = intersectLand.object;
                    //TODO: change to create selected object
                    let figureFactory = new FigureFactor();
                    console.log(land);
                    if (land.figure !== null) return;
                    let figure = figureFactory.createFigure(1, land.mapPositionX, land.mapPositionY, FigureTypes.ARMY);
                    console.log(figure);
                    this.scene.add(figure);
                }
            }
        }
    }


}
