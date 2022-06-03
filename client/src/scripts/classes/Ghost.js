import { Color, Object3D } from "three";
import { CellularNoiseMaterial } from "threejs-shader-materials";
import GameManager from "../GameManager";
import FigureManager from "../managers/FigureManager";
import { runWhenTeamIsSet } from "../utilities/RunWhenExist";
import Figure from "./Figure";
import FigureFactor from "./FigureFactor";
export default class Ghost extends Object3D {
    constructor() {
        super();

        this.rotateX(-Math.PI / 2);
        runWhenTeamIsSet(() => {
            this.material = this.createMaterial();
        });
    }

    setModel(data) {
        if (data.model == this.currentModelName) return;
        this.currentModelName = data.model;
        this.remove(this.model);

        this.model = Figure.createModel(data, "RED");
        if (!this.model) return;

        this.model.castShadow = false;
        this.model.receiveShadow = false;
        this.model.material = this.material;
        this.add(this.model);
    }

    createMaterial() {
        const color =
            GameManager.instance.player.team === "RED"
                ? new Color(0xff2200)
                : new Color(0x0055ff);
        const material = new CellularNoiseMaterial();
        material.color = color;
        material.transparent = true;
        material.grid = 100;
        material.speed = 2.0;
        material.divisionScaleX = 2;
        material.castShadow = false;
        material.receiveShadow = false;
        return material;
    }

    update(obj) {
        const f = GameManager.instance.figureCanBePlaced(obj);
        let data = null;
        try {
            data = FigureManager.instance.getFigure(f.type, f.id);
        } catch (e) {}

        if (data == null || !FigureFactor.canBuy(data, f.type)) {
            this.setModel("");
        } else {
            this.setModel(data);
        }
    }
}
