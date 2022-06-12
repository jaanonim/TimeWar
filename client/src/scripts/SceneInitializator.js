import Stats from "stats-js";
import * as THREE from "three";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import Camera from "./classes/Camera";
import Cursor from "./classes/Cursor";
import MapBase from "./classes/MapBase";
import Settings from "./utilities/Settings";

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

        //Light
        const light = new THREE.DirectionalLight(0xffffff, 2.5, 100);
        light.position.set(10, 20, 10);
        light.castShadow = Settings.instance.get("renderer.shadowMap.enabled");
        this.scene.add(light);

        const light2 = new THREE.DirectionalLight(0xffffff, 1.5, 100);
        light2.position.set(-10, 20, -10);
        this.scene.add(light2);

        this.cursor = new Cursor();
        this.scene.add(this.cursor);

        //Camera
        this.camera = new Camera(displayElement);

        //Inits
        this.initHelpers();
        this.initShadows(light);

        this.scene.add(new MapBase());
    }

    initHelpers() {
        //Stats
        if (Settings.instance.get("stats.fpsCounter")) {
            this.stats = new Stats();
            this.stats.showPanel(0);
            document.body.appendChild(this.stats.dom);
        }
    }

    initShadows(light) {
        if (!light.castShadow) return;

        const shadowSize = 100;
        light.shadow.camera.left = -shadowSize;
        light.shadow.camera.right = shadowSize;
        light.shadow.camera.top = shadowSize;
        light.shadow.camera.bottom = -shadowSize;
        light.shadow.blurSamples = 1;
        light.shadow.mapSize.width =
            1024 * Settings.instance.get("shadow.mapSize.width");
        light.shadow.mapSize.height =
            1024 * Settings.instance.get("shadow.mapSize.height");
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 100;
    }

    update(delta) {
        try {
            this.stats.begin();
        } catch {}

        this.scene.children.forEach((child) => {
            if (child.update !== undefined) child.update(delta);
        });

        TWEEN.update();
        this.camera.update(delta, this.scene);

        this.scene.children.forEach((child) => {
            if (child.lateUpdate !== undefined) child.lateUpdate(delta);
        });

        try {
            this.stats.end();
        } catch {}
    }
}
