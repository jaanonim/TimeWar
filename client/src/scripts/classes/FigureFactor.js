import {FigureTypes} from "../enums/FigureTypes";
import FigureManager from "../managers/FigureManager";
import ArmyFigure from "./figures/ArmyFigure";
import BuildingFigure from "./figures/BuildingFigure";
import ResearchLab from "./figures/ResearchLab";

export default class FigureFactor {
    createArmy(who, x, y, figureId, isBuying) {
        let objData = FigureManager.instance.getFigure(
            FigureTypes.ARMY,
            figureId
        );
        if (objData === undefined) {
            console.error("Unknown type 2");
            return;
        }
        if (isBuying && !ArmyFigure.buy(objData)) {
            return null;
        }

        return new ArmyFigure(who, x, y, objData);
    }

    createBuilding(who, x, y, figureId, isBuying) {
        let objData = FigureManager.instance.getFigure(
            FigureTypes.BUILDING,
            figureId
        );
        if (objData === undefined) {
            console.error("Unknown type 1");
            return;
        }
        if (figureId === 1) {
            return new ResearchLab(who, x, y, objData);
        }

        if (isBuying && !BuildingFigure.buy(objData)) {
            return null;
        }

        return new BuildingFigure(who, x, y, objData);
    }

    createFigure(who, x, y, figureId, typeFigure, isBuying) {
        switch (typeFigure) {
            case FigureTypes.ARMY:
                return this.createArmy(who, x, y, figureId, isBuying);
            case FigureTypes.BUILDING:
                return this.createBuilding(who, x, y, figureId, isBuying);
            default:
                console.error("Unknown type " + typeFigure);
        }
    }
}
