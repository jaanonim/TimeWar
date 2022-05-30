import { Color } from "three";
import { FigureTypes } from "../../enums/FigureTypes";
import { HighLightType } from "../../enums/HighLightType";
import { SupplyTypes } from "../../enums/SupplyTypes";
import GameManager from "../../GameManager";
import MapCreator from "../../MapCreator";
import Socket from "../../Socket";
import Figure from "../Figure";

export default class ArmyFigure extends Figure {
    constructor(who, positionX, positionY, data) {
        super(who, positionX, positionY, FigureTypes.ARMY, data);
        this.isMoved = true;
        this.isAttack = true;
        this.attackMask = data.attackMask;
        this.moveMask = data.moveMask;
        this.damage = data.damage;
        this.isFlyable = data.isFlyable;
    }

    move(x, y) {
        //TODO: path finding and animation
        let oldX = this.mapPositionX;
        let oldY = this.mapPositionY;
        if (this.isMoved) return false;
        if (!this.place(x, y)) return false;
        this.isMoved = true;
        let oldLand = MapCreator.instance.mapObjects[oldX][oldY];
        oldLand.figure = null;
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

    update(delta) {
        super.update(delta);
        if (!this.isMoved || !this.isAttack) {
            this.model.material.color = new Color(0xffffff);
        } else {
            this.model.material.color = new Color(0x888888);
        }
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
        let maskX = relX + Math.floor(attackMaskWidth / 2);
        let maskY = relY + Math.floor(attackMaskHeight / 2);
        if (
            maskX < 0 ||
            maskX >= attackMaskWidth ||
            maskY < 0 ||
            maskY >= attackMaskHeight
        )
            return false;
        return this.attackMask[maskX][maskY];
    }

    select() {
        super.select();
        let gm = GameManager.instance;
        if (gm.attackOption) {
            this.highLightAttackPosition();
        } else {
            this.highLightMovePosition();
        }
    }

    unselect() {
        super.unselect();
        this.unHighLightMovePosition();
        this.unHighLightAttackPosition();
    }

    makeAction(event, land) {
        let x = land.mapPositionX;
        let y = land.mapPositionY;
        let gm = GameManager.instance;
        if (gm.attackOption) {
            if (this.canAttack(x, y)) {
                this.unselect();
                let myX = this.mapPositionX;
                let myY = this.mapPositionY;
                if (this.attack(x, y)) {
                    Socket.instance.attackFigure(myX, myY, x, y);
                }
                gm.selectedFigure = null;
            }
        } else {
            if (this.canMove(x, y)) {
                this.unselect();
                let myX = this.mapPositionX;
                let myY = this.mapPositionY;
                if (this.move(x, y)) {
                    Socket.instance.moveFigure(myX, myY, x, y);
                }
                gm.selectedFigure = null;
            }
        }
    }

    renew() {
        this.isMoved = false;
        this.isAttack = false;
        this.unHighLightMovePosition();
    }

    static canBuy(data) {
        let player = GameManager.instance.player;
        let supply;
        if (data.isFlyable) {
            supply = player.supplies[SupplyTypes.AIR_ARMY];
        } else {
            supply = player.supplies[SupplyTypes.LAND_ARMY];
        }
        return supply.supply >= data.price;
    }

    static buy(data) {
        let player = GameManager.instance.player;
        let supply;
        if (data.isFlyable) {
            supply = player.supplies[SupplyTypes.AIR_ARMY];
        } else {
            supply = player.supplies[SupplyTypes.LAND_ARMY];
        }
        if (ArmyFigure.canBuy(data)) {
            return supply.takeSupply(data.price);
        }
        return false;
    }

    highLightAttackPosition() {
        if (this.who !== GameManager.instance.player.team) return false;
        if (this.isAttack) {
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
        for (let x = 0; x < this.attackMask.length; x++) {
            for (let y = 0; y < this.attackMask[0].length; y++) {
                let xPos =
                    this.mapPositionX - (this.attackMask.length - 1) / 2 + x;
                let yPos =
                    this.mapPositionY - (this.attackMask[0].length - 1) / 2 + y;
                if (MapCreator.instance.mapObjects[xPos] == null) break;
                let object = MapCreator.instance.mapObjects[xPos][yPos];
                if (object != null) {
                    if (this.attackMask[x][y]) {
                        object.hightLightType = HighLightType.ATTACK;
                        object.unHighLight();
                    }
                }
            }
        }
    }

    unHighLightAttackPosition() {
        for (let x = 0; x < this.attackMask.length; x++) {
            for (let y = 0; y < this.attackMask[0].length; y++) {
                let xPos =
                    this.mapPositionX - (this.attackMask.length - 1) / 2 + x;
                let yPos =
                    this.mapPositionY - (this.attackMask[0].length - 1) / 2 + y;
                if (MapCreator.instance.mapObjects[xPos] == null) break;
                let object = MapCreator.instance.mapObjects[xPos][yPos];
                if (object != null) {
                    if (this.attackMask[x][y]) {
                        object.hightLightType = HighLightType.NONE;
                        object.unHighLight();
                    }
                }
            }
        }
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
