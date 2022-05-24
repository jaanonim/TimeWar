import * as THREE from "three";
import MapLand from "../classes/MapLand";
import GameManager from "../GameManager";

export class MouseKeyboardManager {
    constructor(displayElement) {
        this.lastHighlightingObject = null;

        displayElement.addEventListener(
            "mousedown",
            this.mouseClickInteract.bind(this)
        );
        window.addEventListener("keydown", this.keyDownInteract.bind(this));
        window.addEventListener("keyup", this.keyUpInteract.bind(this));
        displayElement.addEventListener("wheel", this.scroll.bind(this));
        displayElement.addEventListener(
            "mousemove",
            this.highlighting.bind(this)
        );
        this.lastEvent = null;
    }

    scroll(event) {
        const gm = GameManager.instance;
        if (event.deltaY > 0) {
            gm.camera.zoomIn();
        } else {
            gm.camera.zoomOut();
        }
    }

    keyDownInteract(event) {
        const gm = GameManager.instance;
        GameManager.instance.camera.keyDown(event);
        if (event.key === "a") {
            if (!gm.attackOption && gm.selectedFigure !== null) {
                gm.selectedFigure.unselect();
                gm.attackOption = true;
                gm.selectedFigure.select();
            }
            gm.attackOption = true;
        }
    }

    keyUpInteract(event) {
        const gm = GameManager.instance;
        GameManager.instance.camera.keyUp(event);
        if (event.key === "a") {
            if (gm.attackOption && gm.selectedFigure !== null) {
                gm.selectedFigure.unselect();
                gm.attackOption = false;
                gm.selectedFigure.select();
            }
            gm.attackOption = false;
        }
    }

    mouseClickInteract(event) {
        const gm = GameManager.instance;
        if (gm.turn !== gm.player.team) return;
        const raycaster = new THREE.Raycaster();
        const mouseVector = new THREE.Vector2();
        mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouseVector, gm.camera);
        const intersects = raycaster.intersectObjects(
            gm.sceneManager.scene.children
        );
        if (intersects.length > 0) {
            let intersectLand = intersects.find(
                (obj) => obj.object?.parent instanceof MapLand
            );
            if (intersectLand !== undefined) {
                let land = intersectLand.object.parent;
                switch (event.button) {
                    case 0:
                        land.onLeftClick(event);
                        break;
                    case 2:
                        land.onRightClick(event);
                        break;
                }
            }
        }
    }

    highlighting(event = this.lastEvent) {
        this.lastEvent = event;
        const gm = GameManager.instance;
        const raycaster = new THREE.Raycaster();
        const mouseVector = new THREE.Vector2();
        mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouseVector, gm.camera);
        const intersects = raycaster.intersectObjects(
            gm.sceneManager.scene.children
        );
        if (intersects.length > 0) {
            let intersectLand = intersects.find(
                (obj) => obj.object?.parent instanceof MapLand
            );
            if (intersectLand !== undefined) {
                let obj = intersectLand.object.parent;
                gm.sceneManager.cursor.move(obj);
                if (this.lastHighlightingObject !== obj) {
                    if (this.lastHighlightingObject != null) {
                        this.lastHighlightingObject.unHighLight();
                        this.lastHighlightingObject.figure?.onHoverExit(event);
                    }
                    this.lastHighlightingObject = obj;
                    this.lastHighlightingObject.highLight();
                    if (this.lastHighlightingObject.figure != null)
                        this.lastHighlightingObject.figure?.onHoverEnter(event);
                }
            }
        }
    }
}
