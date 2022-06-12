import { Color } from "three";
import { HighLightType } from "../../enums/HighLightType";
import ModelsManager from "../../managers/ModelsManager";
import MapLand from "../MapLand";

export default class Land extends MapLand {
    constructor(x, y, mapPositionX, mapPositionY, width, height, modelName) {
        super(x, y, mapPositionX, mapPositionY, width, height);
        this.position.y = -0.5;
        if (ModelsManager.models[modelName] === undefined) {
            console.error("Unknown model", modelName);
            return;
        }
        this.model = ModelsManager.getModel(modelName).children[0].clone();
        this.model.scale.set(1, 1, 1);
        this.model.rotateY((Math.PI / 2) * Math.round(Math.random() * 4));
        this.model.material = this.model.material.clone();
        this.add(this.model);
        this.unHighLight();
    }

    setColor(color) {
        this.model.material.emissive = new Color(color);
    }

    update(delta) {
        super.update(delta);
        if (this.hightLightType === HighLightType.MOVE) {
            this.setColor(0x333333);
        } else if (this.hightLightType === HighLightType.ATTACK) {
            this.setColor(0xaa0000);
        } else {
            this.setColor(0x000000);
        }
    }

    canFigurePlace(figure) {
        return this.figure == null;
    }
}
