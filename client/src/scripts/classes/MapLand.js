import * as THREE from "three";
import GameManager from "../GameManager";
import {HighLightType} from "../enums/HighLightType";

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
        this.hightLightType = HighLightType.NONE;
    }

    capture() {
        //TODO: think about what happen when 2 player want capture 1 place
        if (this.captured == null) {
            this.captured = GameManager.instance.player
        }
    }

    highLight() {
        this.material.color = new THREE.Color(0.5, 0.5, 0.5);
    }

    unHighLight() {
        //TODO: After change to select graphics

        if (this.hightLightType === HighLightType.MOVE) {
            this.material.color = new THREE.Color(0, 0, 1);
        } else if (this.hightLightType === HighLightType.ATTACK) {
            this.material.color = new THREE.Color(1, 0, 0);
        } else {
            this.material.color = new THREE.Color(1, 1, 1);
        }
    }
}
