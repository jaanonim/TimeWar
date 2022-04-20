import { FigureTypes } from "../../enums/FigureTypes";
import { HighLightType } from "../../enums/HighLightType";
import GameManager from "../../GameManager";
import MapCreator from "../../MapCreator";
import Figure from "../Figure";

export default class ArmyFigure extends Figure {
    constructor(who, positionX, positionY, data) {
        super(who, positionX, positionY, FigureTypes.ARMY, data);
        this.isMoved = true;
        this.isAttack = false;
        this.attackMask = data.attackMask;
        this.moveMask = data.moveMask;
        this.damage = data.damage;
        this.isFlyable = data.isFlyable;
    }

    move(x, y) {
        //TODO: path finding and animation
        if (this.isMoved) return false;
        if (!this.place(x, y)) return false;
        this.isMoved = true;
        return true;
    }

    canMove(x, y) {
        let relX = x - this.mapPositionX;
        let relY = y - this.mapPositionY;
        let moveMaskWidth = this.moveMask.length;
        let moveMaskHeight = this.moveMask[0].length;
        let maskX = relX + Math.floor(moveMaskWidth / 2);
        let maskY = relY + Math.floor(moveMaskHeight / 2);
        if (
            maskX < 0 ||
            maskX >= moveMaskWidth ||
            maskY < 0 ||
            maskY >= moveMaskHeight
        )
            return false;
        return this.moveMask[maskX][maskY];
    }

    attack(x, y) {
        if (this.isAttack) return false;
        if (!this.canAttack(x, y)) return false;
        let land = MapCreator.instance.mapObjects[x][y];
        let figure = land.figure;
        if (figure == null) return false;
        figure.makeDamage(this.damage);
        this.isAttack = true;
        return true;
    }

    canAttack(x, y) {
        let relX = x - this.mapPositionX;
        let relY = y - this.mapPositionY;
        let attackMaskWidth = this.attackMask.length;
        let attackMaskHeight = this.attackMask[0].length;
        let maskX = relX - Math.floor(attackMaskWidth / 2);
        let maskY = relY - Math.floor(attackMaskHeight / 2);
        if (
            maskX < 0 ||
            maskX >= attackMaskWidth ||
            maskY < 0 ||
            maskY >= attackMaskHeight
        )
            return false;
        return this.attackMask[maskX][maskY];
    }

    renew() {
        this.isMoved = false;
        this.isAttack = false;
        this.unHighLightMovePosition();
    }

    highLightMovePosition() {
        if (this.who !== GameManager.instance.player.team) return false;
        if (this.isMoved) {
            if (MapCreator.instance.mapObjects[this.mapPositionX] == null)
                return;
            let object =
                MapCreator.instance.mapObjects[this.mapPositionX][
                    this.mapPositionY
                ];
            if (object != null) {
                object.hightLightType = HighLightType.MOVE;
                object.unHighLight();
            }
            return;
        }
        for (let x = 0; x < this.moveMask.length; x++) {
            for (let y = 0; y < this.moveMask[0].length; y++) {
                let xPos =
                    this.mapPositionX - (this.moveMask.length - 1) / 2 + x;
                let yPos =
                    this.mapPositionY - (this.moveMask[0].length - 1) / 2 + y;
                if (MapCreator.instance.mapObjects[xPos] == null) break;
                let object = MapCreator.instance.mapObjects[xPos][yPos];
                if (object != null) {
                    if (this.moveMask[x][y]) {
                        object.hightLightType = HighLightType.MOVE;
                        object.unHighLight();
                    }
                }
            }
        }
    }

    unHighLightMovePosition() {
        for (let x = 0; x < this.moveMask.length; x++) {
            for (let y = 0; y < this.moveMask[0].length; y++) {
                let xPos =
                    this.mapPositionX - (this.moveMask.length - 1) / 2 + x;
                let yPos =
                    this.mapPositionY - (this.moveMask[0].length - 1) / 2 + y;
                if (MapCreator.instance.mapObjects[xPos] == null) break;
                let object = MapCreator.instance.mapObjects[xPos][yPos];
                if (object != null) {
                    if (this.moveMask[x][y]) {
                        object.hightLightType = HighLightType.NONE;
                        object.unHighLight();
                    }
                }
            }
        }
    }
}
