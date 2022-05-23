import * as THREE from "three";
import { HighLightType } from "../enums/HighLightType";
import GameManager from "../GameManager";

export default class MapLand extends THREE.Object3D {
    constructor(
        x,
        y,
        mapPositionX,
        mapPositionY,
        width,
        height,
        geometry,
        material
    ) {
        super(geometry, material);
        this.mapPositionX = mapPositionX;
        this.mapPositionY = mapPositionY;
        this.width = width;
        this.height = height;
        this.position.set(x, 0, y);
        this.captured = null;
        this.captureForce = 0;
        this.figure = null;
        this.hightLightType = HighLightType.NONE;
        this.model = null;
        this.defaultColor = 0xffffff;
        this.myCapturingColor = 0x0000ff;
        this.opponentCapturingColor = 0xff0000;
    }

    capture(who) {
        if (this.captured == null) {
            this.captured = who;
            this.captureForce = 1;
            if (GameManager.instance.player.team === who) {
                this.model.material.color.set(this.myCapturingColor);
            } else {
                this.model.material.color.set(this.opponentCapturingColor);
            }
        } else {
            if (this.captured === who) {
                this.captureForce++;
            } else {
                this.captureForce--;
            }
            if (this.captureForce === 0) {
                this.unCapture();
            }
        }
    }

    unCapture() {
        this.captured = null;
        this.model.material.color.set(this.defaultColor);
    }

    highLight() {
        if (GameManager.instance.turn !== GameManager.instance.player.team)
            return;
        if (this.model == null) return;
        if (this.hightLightType === HighLightType.MOVE) {
            this.model.material.color.set(0x2201ee);
        } else if (this.hightLightType === HighLightType.ATTACK) {
            this.model.material.color.set(0xee4444);
        } else {
            if (this.captured != null) {
                if (GameManager.instance.player.team === this.captured) {
                    this.model.material.color.set(
                        this.myCapturingColor + 0x111111
                    );
                } else {
                    this.model.material.color.set(
                        this.opponentCapturingColor + 0x111111
                    );
                }
            } else {
                this.model.material.color.set(0x0033ee);
            }
        }
    }

    unHighLight() {
        //TODO: After change to select graphics
        if (this.model == null) return;
        if (this.hightLightType === HighLightType.MOVE) {
            this.model.material.color.set(0x3312ff);
        } else if (this.hightLightType === HighLightType.ATTACK) {
            this.model.material.color.set(0xff5555);
        } else if (this.captured != null) {
            if (GameManager.instance.player.team === this.captured) {
                this.model.material.color.set(this.myCapturingColor);
            } else {
                this.model.material.color.set(this.opponentCapturingColor);
            }
        } else {
            this.model.material.color.set(this.defaultColor);
        }
    }

    //HOOKS
    onHoverEnter(event) {}

    onHoverExit(event) {}

    onRightClick(event) {}

    onLeftClick(event) {
        let gm = GameManager.instance;
        if (this.figure !== null && !gm.attackOption) {
            this.figure.onLeftClick(event);
            return;
        }

        if (
            gm.selectedFigure != null &&
            this.hightLightType !== HighLightType.NONE
        ) {
            gm.selectedFigure.makeAction(event, this);
        } else if (!gm.attackOption) {
            gm.placeFigureAction(this);
        }
    }
}
