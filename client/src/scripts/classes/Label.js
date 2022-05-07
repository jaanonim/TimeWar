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
        const gm = GameManager.instance;
        const tempV = new Vector3();
        //const raycaster = new THREE.Raycaster();

        obj.updateWorldMatrix(true, false);
        obj.getWorldPosition(tempV);
        tempV.setY(tempV.y + 3);

        tempV.project(gm.camera);
        /*
        raycaster.setFromCamera(tempV, gm.camera);
        const intersectedObjects = raycaster.intersectObjects(gm.scene.children);
        const show =
          intersectedObjects.length && this.model === intersectedObjects[0].object;
    
        if (!show || Math.abs(tempV.z) > 1) {
          this.label.style.display = "none";
        } else {
          this.label.style.display = "";
        }*/

        const x = (tempV.x * 0.5 + 0.5) * gm.renderer.domElement.clientWidth;
        const y = (tempV.y * -0.5 + 0.5) * gm.renderer.domElement.clientHeight;
        this.labelDom.domElement.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;

        if (this.visible) this.labelDom.domElement.style.display = "";
        else this.labelDom.domElement.style.display = "none";

        this.labelDom.render(this.getComponent());
    }
}
