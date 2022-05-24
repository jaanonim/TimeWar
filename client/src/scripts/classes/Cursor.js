import {
    DoubleSide,
    Mesh,
    MeshBasicMaterial,
    NearestFilter,
    PlaneGeometry,
    TextureLoader,
} from "three";
import MapCreator from "../MapCreator";

export default class Cursor extends Mesh {
    constructor() {
        const size = MapCreator.instance.tileSize;

        const geometry = new PlaneGeometry(size, size);
        const texture = new TextureLoader().load("public/img/Cursor.png");
        texture.minFilter = NearestFilter;
        texture.magFilter = NearestFilter;

        const material = new MeshBasicMaterial({
            map: texture,
            color: 0xffffff,
            side: DoubleSide,
            transparent: true,
        });
        super(geometry, material);

        this.defaultColor = 0xffffff;
        this.redColor = 0x7777ff;
        this.blueColor = 0xff7777;

        this.yPos = 0.6;
        this.rotateX(Math.PI / 2);
        this.hide();
    }

    move(obj) {
        this.show();
        this.position.set(obj.position.x, this.yPos, obj.position.z);
        if (obj.captured === "BLUE") {
            this.material.color.set(this.redColor);
        } else if (obj.captured === "RED") {
            this.material.color.set(this.blueColor);
        } else {
            this.material.color.set(this.defaultColor);
        }
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }
}
