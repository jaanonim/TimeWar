import { FigureTypes } from "../../enums/FigureTypes";
import Figure from "../Figure";

export default class BuildingFigure extends Figure {
    constructor(who, positionX, positionY, data) {
        super(who, positionX, positionY, FigureTypes.BUILDING, data);
        this.isAttack = false;
    }

    renew() {
        super.renew();
        this.isAttack = false;
    }
}
