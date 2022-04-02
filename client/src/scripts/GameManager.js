import * as THREE from "three";
import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls";


export default class GameManager {
    static _instance = null;

    static get instance() {
        if (GameManager._instance == null) {
            GameManager._instance = new GameManager();
        }
        return GameManager._instance;
    }

    initDisplay(displayElement) {
        //Initialization Scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        displayElement.appendChild(this.renderer.domElement);
        // TODO (n2one): Remove later
        let geometry = new THREE.BoxGeometry(1, 1, 1);
        let material = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
        let cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);

        //Helpers
        this.cameraConrols = new OrbitControls(this.camera, this.renderer.domElement);

        const gridHelper = new THREE.GridHelper(100, 100);
        this.scene.add(gridHelper);

        this.camera.position.z = 5;

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
