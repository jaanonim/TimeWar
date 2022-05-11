import { Vector3 } from "three";
import GameManager from "../GameManager";
import LabelsManager from "../LabelsManager";

export default class Label {
    constructor() {
        this.labelDom = LabelsManager.instance.createLabel();
        this.setComponent(() => null);
        this.labelDom.render(this.getComponent());
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    show() {
        this.visible = true;
    }

    setComponent(component) {
        this.getComponent = component;
    }

    update(obj) {
        const sm = GameManager.instance.sceneManager;
        const tempV = new Vector3();
        //const raycaster = new THREE.Raycaster();

        obj.updateWorldMatrix(true, false);
        obj.getWorldPosition(tempV);
        tempV.setY(tempV.y + 3);

        tempV.project(sm.camera);
        /*
        raycaster.setFromCamera(tempV, sm.camera);
        const intersectedObjects = raycaster.intersectObjects(sm.scene.children);
        const show =
          intersectedObjects.length && this.model === intersectedObjects[0].object;
    
        if (!show || Math.abs(tempV.z) > 1) {
          this.label.style.display = "none";
        } else {
          this.label.style.display = "";
        }*/

        const x = (tempV.x * 0.5 + 0.5) * sm.renderer.domElement.clientWidth;
        const y = (tempV.y * -0.5 + 0.5) * sm.renderer.domElement.clientHeight;
        this.labelDom.domElement.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;

        if (this.visible) this.labelDom.domElement.style.display = "";
        else this.labelDom.domElement.style.display = "none";

        this.labelDom.render(this.getComponent());
    }
}
