import * as THREE from "three";
import {
    HighLightType
} from "../enums/HighLightType";
import GameManager from "../GameManager";

export default class MapLand extends THREE.Object3D {
    constructor(x, y, mapPositionX, mapPositionY, width, height, geometry, material) {
        super(geometry, material);
        this.mapPositionX = mapPositionX;
        this.mapPositionY = mapPositionY;
        this.width = width;
        this.height = height;
        this.position.set(x, 0, y);
        this.captured = null;
        this.figure = null;
        this.hightLightType = HighLightType.NONE;
    }

    capture() {
        //TODO: think about what happen when 2 player want capture 1 place
        if (this.captured == null) {
            this.captured = GameManager.instance.player
        }
    }

    highLight() {
        this.material.color.set(0x777777)
    }

    unHighLight() {
        //TODO: After change to select graphics

        if (this.hightLightType === HighLightType.MOVE) {
            this.material.color.set(0x55ffaa)
        } else if (this.hightLightType === HighLightType.ATTACK) {
            this.material.color.set(0xff5555)
        } else {
            this.material.color.set(0x555555)
        }
    }
}
