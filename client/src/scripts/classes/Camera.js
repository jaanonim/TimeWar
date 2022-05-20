import * as THREE from "three";
import { PerspectiveCamera } from "three";
import Settings from "../utilities/Settings";

const PI_2 = Math.PI / 2;
export default class Camera extends PerspectiveCamera {
    /* CONSTS */
    get maxRotatment() {
        return new THREE.Box3(
            new THREE.Vector3(0, this.baseRotationPosY - 1, 0.2),
            new THREE.Vector3(0, this.baseRotationPosY + 1, 1)
        );
    }

    get maxMovment() {
        return new THREE.Box3(
            new THREE.Vector3(-10, 0, -10),
            new THREE.Vector3(10, 0, 10)
        );
    }
    /* ***** */

    get eluerPos() {
        return new THREE.Euler(
            this.rotationPos.x,
            this.rotationPos.y,
            this.rotationPos.z
        );
    }

    constructor(displayElement) {
        super(
            Settings.instance.get("camera.fov"),
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.movment = new THREE.Vector3(0, 0, 0);
        this.rotatment = new THREE.Vector3(0, 0, 0);

        /* INITIAL POSITION */
        this.baseRotationPosY = PI_2;

        this.rootPos = new THREE.Vector3(0, 0, 0);
        this.movePos = new THREE.Vector3(30, 0, 0);
        this.rotationPos = new THREE.Vector3(0, this.baseRotationPosY, 0.7);

        /* CONSTS */
        const ms = Settings.instance.get("camera.movmentSpeed");
        const rs = Settings.instance.get("camera.rotatmentSpeed");
        this.movmentSpeed = new THREE.Vector3(ms, 0, ms);
        this.rotatmentSpeed = new THREE.Vector3(0, rs, rs);
        this.maxZoom = 40;
        this.minZoom = 5;

        this.updatePos();
        this.setupRender(displayElement);

        //Add Listener for resizing screen
        window.addEventListener("resize", this.onWindowResize.bind(this));
    }

    setSite(team) {
        this.baseRotationPosY *= team === "RED" ? -1 : 1;
        this.rotationPos.y = this.baseRotationPosY;
        this.updatePos();
    }

    updatePos() {
        let pos = this.movePos.clone().applyEuler(this.eluerPos);
        pos = this.rootPos.clone().add(pos);
        this.position.set(pos.x, pos.y, pos.z);
        this.lookAt(this.rootPos);
    }

    onWindowResize() {
        this.aspect = window.innerWidth / window.innerHeight;
        this.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    setupRender(displayElement) {
        this.renderer = new THREE.WebGLRenderer({
            antialias: Settings.instance.get("renderer.antialias"),
            powerPreference: "high-performance",
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(
            window.devicePixelRatio *
                Settings.instance.get("renderer.pixelRatio")
        );

        this.renderer.shadowMap.enabled = Settings.instance.get(
            "renderer.shadowMap.enabled"
        );
        this.renderer.shadowMap.type = THREE.PCFShadowMap;

        displayElement.innerHTML = "";
        displayElement.appendChild(this.renderer.domElement);
    }

    moveCam(delta) {
        const mov = this.movment.clone().applyEuler(this.eluerPos);
        this.rootPos.x += mov.x * delta * this.movmentSpeed.x;
        this.rootPos.z += mov.z * delta * this.movmentSpeed.z;
        this.maxMovment.clampPoint(this.rootPos, this.rootPos);
    }

    rotateCam(delta) {
        this.rotationPos.y += this.rotatment.y * delta * this.rotatmentSpeed.y;
        this.rotationPos.z += this.rotatment.z * delta * this.rotatmentSpeed.z;
        this.maxRotatment.clampPoint(this.rotationPos, this.rotationPos);
    }

    update(delta, scene) {
        this.moveCam(delta);
        this.rotateCam(delta);
        this.updatePos();
        this.renderer.render(scene, this);
    }

    zoomIn() {
        this.movePos.setX(this.movePos.x + 1);
        if (this.maxZoom < this.movePos.x) {
            this.movePos.setX(this.maxZoom);
        }
    }

    zoomOut() {
        this.movePos.setX(this.movePos.x - 1);
        if (this.minZoom > this.movePos.x) {
            this.movePos.setX(this.minZoom);
        }
    }

    keyUp(event) {
        if (event.key === "ArrowUp") {
            this.movment.x = 0;
        }
        if (event.key === "ArrowDown") {
            this.movment.x = 0;
        }
        if (event.key === "ArrowLeft") {
            this.movment.z = 0;
        }
        if (event.key === "ArrowRight") {
            this.movment.z = 0;
        }
        if (event.key === "e") {
            this.rotatment.y = 0;
        }
        if (event.key === "q") {
            this.rotatment.y = 0;
        }
        if (event.key === "r") {
            this.rotatment.z = 0;
        }
        if (event.key === "f") {
            this.rotatment.z = 0;
        }
    }

    keyDown(event) {
        if (event.key === "ArrowUp") {
            this.movment.x = -1;
        }
        if (event.key === "ArrowDown") {
            this.movment.x = 1;
        }
        if (event.key === "ArrowLeft") {
            this.movment.z = 1;
        }
        if (event.key === "ArrowRight") {
            this.movment.z = -1;
        }
        if (event.key === "e") {
            this.rotatment.y = 1;
        }
        if (event.key === "q") {
            this.rotatment.y = -1;
        }
        if (event.key === "r") {
            this.rotatment.z = 1;
        }
        if (event.key === "f") {
            this.rotatment.z = -1;
        }
    }
}
