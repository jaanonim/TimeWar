import { FigureTypes } from "../../enums/FigureTypes";
import { SupplyTypes } from "../../enums/SupplyTypes";
import GameManager from "../../GameManager";
import { UiHandlers } from "../../managers/UiHandlers";
import MapCreator from "../../MapCreator";
import Figure from "../Figure";

export default class BuildingFigure extends Figure {
    constructor(who, positionX, positionY, data) {
        super(who, positionX, positionY, FigureTypes.BUILDING, data);
        this.capturingMask = data.capturingMask;
        if (data.increaseSupplyType != null) {
            this.increaseSupplyType = SupplyTypes[data.increaseSupplyType];
            this.increaseSupply = data.increaseSupply;
        }
    }

    getSupply() {
        const player = GameManager.instance.player;
        return player.supplies[SupplyTypes.BUILDING];
    }

    buy() {
        super.buy(this.getSupply.bind(this));
    }

    canBuy() {
        return super.canBuy(this.getSupply.bind(this));
    }

    renew() {
        super.renew();
        this.takeDamage = false;
    }

    capture() {
        let map = MapCreator.instance.mapObjects;
        let maskWidth = this.capturingMask.length;
        let maskHeight = this.capturingMask[0].length;
        for (let x = 0; x < maskWidth; x++) {
            for (let y = 0; y < maskHeight; y++) {
                let mapPosX = this.mapPositionX + x - Math.floor(maskWidth / 2);
                let mapPosY =
                    this.mapPositionY + y - Math.floor(maskHeight / 2);
                if (
                    mapPosX < 0 ||
                    mapPosX >= map.length ||
                    mapPosY < 0 ||
                    mapPosY >= map[0].length
                ) {
                    continue;
                }

                if (this.capturingMask[x][y]) {
                    if (map[mapPosX] != null)
                        map[mapPosX][mapPosY]?.capture(this.who);
                }
            }
        }
    }

    placeAction() {
        let player = GameManager.instance.player;
        if (this.increaseSupplyType != null) {
            player.supplies[this.increaseSupplyType].increaseMaxSupply(
                this.increaseSupply
            );
            UiHandlers.instance.updateSupply();
        }
    }
}
