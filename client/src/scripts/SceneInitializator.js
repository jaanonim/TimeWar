import Stats from "stats-js";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export class SceneInitializator {
    constructor(displayElement) {
        return new Promise(async (resolve) => {
            await this.initDisplay(displayElement);
            resolve(this);
        });
    }

    async initDisplay(displayElement) {
        //Initialization Scene
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        displayElement.innerHTML = "";
        displayElement.appendChild(this.renderer.domElement);
        this.renderer.domElement.addEventListener(
            'webglcontextlost',
            (event) => {
                event.preventDefault();
                setTimeout(() => {
                    console.log("RESTORE");
                    this.renderer.forceContextRestore();
                }, 100);
            },
            false
        );

        //Light
        const light = new THREE.DirectionalLight(0xffffff, 3, 100);
        light.position.set(10, 20, 10);
        light.castShadow = true;
        this.scene.add(light);

        const light2 = new THREE.DirectionalLight(0xffffff, 1, 100);
        light2.position.set(-10, -20, -10);
        this.scene.add(light2);

        //Inits
        this.initCamera();
        this.initHelpers();
        this.initShadows(light);

        //Add Listener for resizing screen
        window.addEventListener("resize", this.onWindowResize.bind(this));
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.y = 25;
        this.camera.position.z = 35;
    }

    initHelpers() {
        this.cameraConrols = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );

        //Stats
        this.stats = new Stats();
        this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom);
    }

    initShadows(light) {
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;

        const shadowSize = 100;
        light.shadow.camera.left = -shadowSize;
        light.shadow.camera.right = shadowSize;
        light.shadow.camera.top = shadowSize;
        light.shadow.camera.bottom = -shadowSize;
        light.shadow.blurSamples = 1;
        light.shadow.mapSize.width = 1024 * 64;
        light.shadow.mapSize.height = 1024 * 64;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 100;
    }

    update() {
        this.stats.begin();
        this.cameraConrols.update();
        this.scene.children.forEach((child) => {
            if (child.update !== undefined) child.update();
        });
        this.renderer.render(this.scene, this.camera);
        this.stats.end();
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
