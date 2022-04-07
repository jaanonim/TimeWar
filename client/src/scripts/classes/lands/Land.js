import ModelsManager from "../../ModelsManager";
import MapLand from "../MapLand";

export default class Land extends MapLand {
    constructor(x, y, mapPositionX, mapPositionY, width, height) {
        super(x, y, mapPositionX, mapPositionY, width, height);
        this.position.y = -0.5;
        this.model = ModelsManager.models["land"].children[0].clone();
        this.model.scale.set(1, 1, 1);
        this.model.rotateY(Math.PI / 2 * Math.round(Math.random() * 4));
        this.model.material = this.model.material.clone();
        this.add(this.model);
        this.defaultColor = 0xaaffee;
        this.unHighLight();
    }
}
