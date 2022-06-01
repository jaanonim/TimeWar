import { Color, Object3D } from "three";
import { CellularNoiseMaterial } from "threejs-shader-materials";
import GameManager from "../GameManager";
import { runWhenTeamIsSet } from "../utilities/RunWhenExist";
export default class Ghost extends Object3D {
    constructor() {
        super();

        this.rotateX(-Math.PI / 2);
        runWhenTeamIsSet(() => {
            this.material = this.createMaterial();
        });
    }

    setModel(model) {
        this.remove(this.model);

        if (!model) return;
        this.model = model.clone();
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

    update(land) {
        const f = land.canPleaceCurrentFigure();

        if (f == null) {
            this.setModel(null);
        } else {
            this.setModel(f.model);
        }
    }
}
