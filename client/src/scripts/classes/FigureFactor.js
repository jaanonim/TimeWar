import {FigureTypes} from "../enums/FigureTypes";
import {ArmyFigureTypes} from "../enums/ArmyFigureTypes";
import ArachnodroidFigure from "./figures/ArachnodroidFigure";

export default class FigureFactor {

    createArmy(figureId, x, y) {
        switch (figureId) {
            case ArmyFigureTypes.ARACHNODROID:
                return new ArachnodroidFigure(x, y);
            default:
                console.error("Unknown army figure " + figureId);
        }
    }

    createFigure(figureId, x, y, typeFigure) {
        switch (typeFigure) {
            case FigureTypes.ARMY:
                return this.createArmy(figureId, x, y);
            default:
                console.error("Unknown type " + typeFigure);
        }
    }
}
