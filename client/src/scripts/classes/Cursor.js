import {
    DoubleSide,
    Mesh,
    MeshBasicMaterial,
    NearestFilter,
    PlaneGeometry,
    TextureLoader,
} from "three";
import GameManager from "../GameManager";
import MapCreator from "../MapCreator";

export default class Cursor extends Mesh {
    constructor(lockTexture = false) {
        const size = MapCreator.instance.tileSize;

        const geometry = new PlaneGeometry(size, size);
        const texture = new TextureLoader().load("/img/Cursor.png");
        const textureAttack = new TextureLoader().load("/img/Attack.png");
        texture.minFilter = NearestFilter;
        texture.magFilter = NearestFilter;

        textureAttack.minFilter = NearestFilter;
        textureAttack.magFilter = NearestFilter;

        const material = new MeshBasicMaterial({
            map: texture,
            color: 0xffffff,
            side: DoubleSide,
            transparent: true,
        });
        super(geometry, material);

        this.defaultTexture = texture;
        this.attackTexture = textureAttack;
        this.lock = lockTexture;

        this.yPos = 0.7;
        this.rotateX(Math.PI / 2);
    }

    move(obj) {
        this.position.set(obj.position.x, this.yPos, obj.position.z);
    }

    update() {
        if (this.lock) return;
        if (GameManager.instance.attackOption) {
            this.material.map = this.attackTexture;
        } else {
            this.material.map = this.defaultTexture;
        }
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }
}
