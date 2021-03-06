import { TextureLoader } from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export default class ModelsManager {
    static models = {};

    static async loadModels() {
        //Figures
        this.models.arachnoid = this.loadModel(
            "models/Figures/Arachnodroid/Arachnoid",
            ["red", "blue"]
        );
        this.models.reconBot = this.loadModel(
            "models/Figures/ReconBot/ReconBot",
            ["red", "blue"]
        );
        this.models.MechaTrooper = this.loadModel(
            "models/Figures/MechaTrooper/MechaTrooper",
            ["red", "blue"]
        );
        this.models.StarMarineTrooper = this.loadModel(
            "models/Figures/StarMarineTrooper/StarMarineTrooper",
            ["red", "blue"]
        );
        this.models.RedFighter = this.loadModel(
            "models/Figures/RedFighter/RedFighter",
            ["red", "blue"]
        );
        this.models.QuadrupedTank = this.loadModel(
            "models/Figures/QuadrupedTank/QuadrupedTank",
            ["red", "blue"]
        );
        this.models.CamoStellarJet = this.loadModel(
            "models/Figures/CamoStellarJet/CamoStellarJet",
            ["red", "blue"]
        );

        // Buildings
        this.models.factory = this.loadModel(
            "models/Buildings/Factory/Factory",
            ["red", "blue"]
        );
        this.models.lab = this.loadModel("models/Buildings/Lab/Lab", [
            "red",
            "blue",
        ]);
        this.models.airport = this.loadModel(
            "models/Buildings/Airport/Airport",
            ["red", "blue"]
        );
        this.models.barracks = this.loadModel(
            "models/Buildings/Barracks/Barracks",
            ["red", "blue"]
        );
        this.models.reconRadar = this.loadModel(
            "models/Buildings/ReconRadar/ReconRadar",
            ["red", "blue"]
        );

        // Land
        this.models.land = this.loadModel("models/Land/Land/Land");
        this.models.land2 = this.loadModel("models/Land/Land2/Land2");
        this.models.mountain = this.loadModel("models/Land/Mountain/Mountain");
        this.models.mountain2 = this.loadModel(
            "models/Land/Mountain2/Mountain2"
        );
        this.models.see = this.loadModel("models/Land/See/See");
        this.models.see2 = this.loadModel("models/Land/See2/See2");

        // -----------------------------------------------------------
        for (const [key, value] of Object.entries(this.models)) {
            this.models[key] = await value;
        }
    }

    static getModel(name, color) {
        if (color) {
            return this.models[name][color];
        } else {
            return this.models[name]["default"];
        }
    }

    static processModel(object, src, textures) {
        object.children[0].castShadow = true;
        object.children[0].receiveShadow = true;
        if (textures) {
            let objs = { default: object };
            textures.forEach((texture) => {
                const model = object.clone();
                model.children[0].material = model.children[0].material.clone();
                model.children[0].material.map = new TextureLoader().load(
                    src + "_" + texture + ".png"
                );
                objs[texture] = model;
            });
            return objs;
        } else {
            return { default: object };
        }
    }

    static loadModel(src, textures) {
        return new Promise((resolve) => {
            const loader = new OBJLoader();
            const materialsLoader = new MTLLoader();
            materialsLoader.load(src + ".mtl", (materialsCreator) => {
                loader.setMaterials(materialsCreator);
                loader.load(
                    src + ".obj",
                    (object) => {
                        resolve(
                            ModelsManager.processModel(object, src, textures)
                        );
                    },
                    null,
                    (error) => {
                        console.error("An error happened", error);
                    }
                );
            });
        });
    }
}
