import { Vector3 } from "three";
import GameManager from "../GameManager";
import LabelsManager from "../managers/LabelsManager";

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
        const camera = GameManager.instance.camera;
        const tempV = new Vector3();

        obj.updateWorldMatrix(true, false);
        obj.getWorldPosition(tempV);
        tempV.setY(tempV.y + 3);

        tempV.project(camera);

        const x =
            (tempV.x * 0.5 + 0.5) * camera.renderer.domElement.clientWidth;
        const y =
            (tempV.y * -0.5 + 0.5) * camera.renderer.domElement.clientHeight;
        this.labelDom.domElement.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;

        if (this.visible) this.labelDom.domElement.style.display = "";
        else this.labelDom.domElement.style.display = "none";

        this.labelDom.render(this.getComponent());
    }

    destroy() {
        this.visible = false;
        this.labelDom.destroy();
    }
}
