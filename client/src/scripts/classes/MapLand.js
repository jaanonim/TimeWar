import * as THREE from "three";
import { HighLightType } from "../enums/HighLightType";
import GameManager from "../GameManager";
import MapCreator from "../MapCreator";

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
        this.redColor = 0x4444ff;
        this.blueColor = 0xff4444;
        this.attackColor = 0xff0000;
        this.moveColor = 0x00ff00;
        this.createBorders();
    }

    createBorders() {
        const borderSize = 0.2;
        const tileSize = MapCreator.instance.tileSize;
        const borderMove = 1.5;

        // left top rigth bottom
        this.borders = [
            this.createBorder(borderSize, tileSize, borderMove, 0),
            this.createBorder(tileSize, borderSize, 0, borderMove),
            this.createBorder(borderSize, tileSize, -borderMove, 0),
            this.createBorder(tileSize, borderSize, 0, -borderMove),
        ];
    }

    createBorder(sizeX, sizeY, posX, pozZ) {
        const geometry = new THREE.PlaneGeometry(sizeX, sizeY);

        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true,
        });

        const obj = new THREE.Mesh(geometry, material);

        obj.rotateX(Math.PI / 2);
        obj.position.set(posX, 1, pozZ);
        this.add(obj);

        obj.hide = () => {
            obj.visible = false;
        };
        obj.show = () => {
            obj.visible = true;
        };
        obj.setColor = (color) => {
            obj.material.color.set(color);
        };

        obj.hide();

        return obj;
    }

    updateBorder() {
        if (this.captured == null) return;

        const data = [
            { x: this.mapPositionX + 1, y: this.mapPositionY },
            { x: this.mapPositionX, y: this.mapPositionY + 1 },
            { x: this.mapPositionX - 1, y: this.mapPositionY },
            { x: this.mapPositionX, y: this.mapPositionY - 1 },
        ];

        this.borders.forEach((border, i) => {
            let obj = MapCreator.instance.mapObjects[data[i].x];
            if (obj != null) {
                obj = obj[data[i].y];
            }

            if (obj && obj.captured === this.captured) {
                border.hide();
            } else {
                border.setColor(
                    this.captured === "BLUE" ? this.redColor : this.blueColor
                );
                border.show();
            }
        });
    }

    update() {
        this.updateBorder();
    }

    capture(who) {
        if (this.captured == null) {
            this.captured = who;
            this.captureForce = 1;
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
        this.borders.forEach((border) => {
            border.hide();
        });
    }

    highLight() {}

    unHighLight() {}

    //HOOKS
    onHoverEnter(event) {}

    onHoverExit(event) {}

    onRightClick(event) {}

    canPleaceCurrentFigure() {
        const gm = GameManager.instance;
        const team = gm.player.team;
        if (!gm.selectFigureUiData.isSelected) return null;
        if (this.captured !== team) return null;
        const figure = gm.createFigure(
            team,
            this.mapPositionX,
            this.mapPositionY,
            gm.selectFigureUiData
        );
        if (!figure.canBuy()) return null;
        return figure;
    }

    onLeftClick(event) {
        console.log("onLeftClick");
        const gm = GameManager.instance;
        if (this.figure !== null && !gm.attackOption) {
            c;
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
