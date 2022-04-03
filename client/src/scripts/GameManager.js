import MapCreator from "./MapCreator";
import * as THREE from "three";
import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls";
import Player from "./classes/Player";


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
        this.player = new Player("Player","blue");
    }
    initDisplay(displayElement) {
        //Initialization Scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        displayElement.innerHTML = "";
        displayElement.appendChild(this.renderer.domElement);
        MapCreator.instance.createMap(this.scene);

        //Helpers
        this.cameraConrols = new OrbitControls(this.camera, this.renderer.domElement);
        const gridHelper = new THREE.GridHelper(100, 100);
        this.scene.add(gridHelper);
        this.camera.position.y = 25;
        this.camera.position.z = 35;
        this.update();

        //Add Listener for resizing screen
        window.addEventListener("resize", this.onWindowResize.bind(this));

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


}
