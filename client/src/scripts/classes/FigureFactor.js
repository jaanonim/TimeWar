import {FigureTypes} from "../enums/FigureTypes";
import FigureManager from "../FigureManager";
import ArmyFigure from "./figures/ArmyFigure";
import ResearchLab from "./figures/ResearchLab";
import BuildingFigure from "./figures/BuildingFigure";

export default class FigureFactor {

    createArmy(figureId, x, y, who) {
        let objData = FigureManager.instance.getFigure(FigureTypes.ARMY, figureId);
        if (objData === undefined) {
            console.error("Unknown type");
            return;
        }
        return new ArmyFigure(who, x, y, objData.id, objData.name, objData.image, objData.description, objData.capturingMask, objData.lives,
            objData.model,objData.scale, objData.attackMask, objData.moveMask, objData.damage, objData.isFlyable);

    }

    createBuilding(figureId, x, y, who) {
        let objData = FigureManager.instance.getFigure(FigureTypes.BUILDING, figureId);
        if (objData === undefined) {
            console.error("Unknown type");
            return;
        }

        if (figureId === 1) {
            return new ResearchLab(who, x, y, objData.id, objData.name, objData.image, objData.description, objData.capturingMask, objData.model,objData.scale,)
        }
        return new BuildingFigure(who, x, y, objData.id, objData.name, objData.image, objData.description, objData.capturingMask, objData.lives,
            objData.model,objData.scale,);

    }

    createFigure(figureId, x, y, typeFigure, who) {
        switch (typeFigure) {
            case FigureTypes.ARMY:
                return this.createArmy(figureId, x, y, who);
            case FigureTypes.BUILDING:
                return this.createBuilding(figureId, x, y, who);
            default:
                console.error("Unknown type " + typeFigure);
        }
    }
}
