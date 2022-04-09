import ModelsManager from "../../ModelsManager";
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
}
