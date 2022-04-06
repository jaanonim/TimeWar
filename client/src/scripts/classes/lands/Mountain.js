import ModelsManager from "../../ModelsManager";
import MapLand from "../MapLand";

export default class Mountain extends MapLand {
    constructor(x, y, mapPositionX, mapPositionY, width, height) {
        super(x, y, mapPositionX, mapPositionY, width, height);
        this.position.y = -0.5;
        let model = ModelsManager.models["mountain"].clone();
        model.scale.set(1, 1, 1);
        model.rotateY(Math.PI / 2 * Math.round(Math.random() * 4));
        this.add(model);
    }
}
