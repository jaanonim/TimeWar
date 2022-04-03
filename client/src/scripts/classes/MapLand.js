import * as THREE from "three";
import GameManager from "../GameManager";

export default class MapLand extends THREE.Mesh {
    constructor(x, y, mapPositionX, mapPositionY, width, height, geometry, material) {
        super(geometry, material);
        this.mapPositionX = mapPositionX;
        this.mapPositionY = mapPositionY;
        this.width = width;
        this.height = height;
        this.position.set(x, 0, y);
        this.captured = null;
        this.figure = null;
    }

    capture() {
        //TODO: think about what when 2 player want capture 1 place
        if (this.captured == null) {
            this.captured = GameManager.instance.player
        }
    }
}
