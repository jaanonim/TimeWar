import { FigureTypes } from "../../enums/FigureTypes";
import Figure from "../Figure";

export default class BuildingFigure extends Figure {
    constructor(who, positionX, positionY, data) {
        super(who, positionX, positionY, FigureTypes.BUILDING, data);
        this.capturingMask = data.capturingMask;
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
                let mapPosX = x - maskWidth / 2;
                let mapPosY = y - maskHeight / 2;
                if (
                    mapPosX < 0 ||
                    mapPosX >= map.length ||
                    mapPosY < 0 ||
                    mapPosY > map[0].length
                ) {
                    break;
                }
                if (this.capturingMask[x][y]) {
                    map[mapPosX][mapPosY].capture();
                }
            }
        }
    }
}
