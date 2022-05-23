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
            color: 0xff0000,
            side: DoubleSide,
            transparent: true,
        });
        super(geometry, material);
        this.position.set(size / 2, 0.6, -size / 2);
        this.rotateX(Math.PI / 2);
    }
}
