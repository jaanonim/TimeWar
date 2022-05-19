import * as THREE from "three";
import { Object3D, PerspectiveCamera } from "three";

export default class Camera extends Object3D {
    constructor(displayElement, fov) {
        super();
        this.camera = new PerspectiveCamera(
            fov,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.position.set(0, 0, 0);
        this.camera.position.set(0, 20, 35);

        this.setupRender(displayElement);

        //Add Listener for resizing screen
        window.addEventListener("resize", this.onWindowResize.bind(this));
    }

    onWindowResize() {
        this.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    setupRender(displayElement) {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;

        displayElement.innerHTML = "";
        displayElement.appendChild(this.renderer.domElement);
    }

    update(scene) {
        this.renderer.render(scene, this.camera);
    }
}
