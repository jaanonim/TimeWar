import {
    MTLLoader
} from "three/examples/jsm/loaders/MTLLoader";
import {
    OBJLoader
} from "three/examples/jsm/loaders/OBJLoader";

export default class ModelsManager {
    static models = {};

    static async loadModels() {
        this.models.arachnoid = await this.loadModel("models/Figures/Arachnodroid/Arachnoid");
        this.models.reconBot = await this.loadModel("models/Figures/ReconBot/ReconBot");
        this.models.land = await this.loadModel("models/Land/Land/Land");
        this.models.mountain = await this.loadModel("models/Land/Mountain/Mountain");
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
                        object.children[0].castShadow = true;
                        object.children[0].receiveShadow = true;
                        resolve(object);
                    }, null,
                    (error) => {
                        console.log('An error happened', error);
                    }
                );
            });

        }));

    }
}
