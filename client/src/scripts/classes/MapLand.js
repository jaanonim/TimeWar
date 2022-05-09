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
        this.model = null;
        this.defaultColor = 0xffffff;
    }

    capture() {
        //TODO: think about what happen when 2 player want capture 1 place
        if (this.captured == null) {
            this.captured = GameManager.instance.player
        }
    }

    highLight() {
        if (this.model == null) return;
        if (this.hightLightType === HighLightType.MOVE) {
            this.model.material.color.set(0x2201ee)
        } else if (this.hightLightType === HighLightType.ATTACK) {
            this.model.material.color.set(0xee4444)
        } else {
            this.model.material.color.set(0x0033ee)
        }
    }

    unHighLight() {
        //TODO: After change to select graphics
        if (this.model == null) return;
        if (this.hightLightType === HighLightType.MOVE) {
            this.model.material.color.set(0x3312ff)
        } else if (this.hightLightType === HighLightType.ATTACK) {
            this.model.material.color.set(0xff5555)
        } else {
            this.model.material.color.set(this.defaultColor)
        }
    }

    onHoverEnter(event) {
    }

    onHoverExit(event) {
    }

    onRightClick(event) {

    }

    onLeftClick(event) {
        if (this.figure !== null) {
            this.figure.onLeftClick(event);
            return;
        }

        if (GameManager.instance.selectedFigure != null && this.hightLightType !== HighLightType.NONE) {
            GameManager.instance.selectedFigure.makeAction(event, this);
        } else {
            GameManager.instance.placeFigureAction(this);
        }
    }
}
