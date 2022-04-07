import {FigureTypes} from "../enums/FigureTypes";
import FigureManager from "../FigureManager";
import ArmyFigure from "./figures/ArmyFigure";

export default class FigureFactor {

    createArmy(figureId, x, y,who) {
        let objData = FigureManager.landArmy.find(obj => obj.id === figureId);
        if (objData === undefined) {
            console.error("Unknown type");
            return;
        }
        return new ArmyFigure(who,x, y, objData.id, objData.name, objData.image, objData.description, objData.capturingMask, objData.lives,
            objData.model, objData.attackMask, objData.moveMask, objData.damage, objData.isFlyable);

    }

    createFigure(figureId, x, y, typeFigure,who) {
        switch (typeFigure) {
            case FigureTypes.ARMY:
                return this.createArmy(figureId, x, y,who);
            default:
                console.error("Unknown type " + typeFigure);
        }
    }
}
