import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";
import MapCreator from "../MapCreator";

export default class MapBase extends Mesh {
    constructor() {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshPhongMaterial({
            color: 0x111111,
        });
        super(geometry, material);
    }

    update() {
        this.scale.set(
            MapCreator.instance.mapWidth,
            1000,
            MapCreator.instance.mapHeight
        );
        this.position.set(0, -500.5, 0);
    }
}
