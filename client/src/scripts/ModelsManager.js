import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader";

export default class ModelsManager {
    static models = {};

    static async loadModels() {
        this.models.arachnoid = await this.loadModel("models/Arachnodroid/Arachnoid");
        console.log(this.models);
    }

    static loadModel(src) {
        return new Promise((resolve => {
            const loader = new OBJLoader();
            const materialsLoader = new MTLLoader();
            materialsLoader.load(src + ".mtl", function (materialsCreator) {
                loader.setMaterials(materialsCreator);
                loader.load(
                    src + ".obj",
                    (object) => {
                        resolve(object);
                    },
                    (error) => {
                        console.log('An error happened', error);
                    }
                );
            });

        }));

    }
}