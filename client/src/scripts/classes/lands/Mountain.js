import ModelsManager from "../../ModelsManager";
import MapLand from "../MapLand";

export default class Mountain extends MapLand {
    constructor(x, y, mapPositionX, mapPositionY, width, height) {
        super(x, y, mapPositionX, mapPositionY, width, height);
        this.position.y = -0.5;
        this.model = ModelsManager.models["mountain"].children[0].clone();
        this.model.scale.set(1, 1, 1);
        this.model.rotateY(Math.PI / 2 * Math.round(Math.random() * 4));
        this.model.material = this.model.material.clone();
        this.add(this.model);
        this.unHighLight();
    }
}
