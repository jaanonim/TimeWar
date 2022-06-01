import { FigureTypes } from "../enums/FigureTypes";
import FigureManager from "../managers/FigureManager";
import ArmyFigure from "./figures/ArmyFigure";
import BuildingFigure from "./figures/BuildingFigure";
import ResearchLab from "./figures/ResearchLab";

export default class FigureFactor {
    createArmy(who, x, y, figureId) {
        let objData = FigureFactor.getData(figureId, FigureTypes.ARMY);
        if (!objData) {
            console.error("Unknown type");
            return;
        }

        return new ArmyFigure(who, x, y, objData);
    }

    createBuilding(who, x, y, figureId) {
        let objData = FigureFactor.getData(figureId, FigureTypes.BUILDING);
        if (!objData) {
            console.error("Unknown type");
            return;
        }

        if (figureId === 1) {
            return new ResearchLab(who, x, y, objData);
        }

        let building = new BuildingFigure(who, x, y, objData);
        return building;
    }

    createFigureFromData(who, x, y, data) {
        let figureType = data.figureType;
        let figureId = data.figureId;
        if (figureType === FigureTypes.ARMY) {
            return new ArmyFigure(who, x, y, data);
        } else if (figureType === FigureTypes.BUILDING) {
            if (figureId === 1) {
                return new ResearchLab(who, x, y, data);
            }
            return new BuildingFigure(who, x, y, data);
        }
        return null;
    }

    createFigure(who, x, y, figureId, typeFigure) {
        switch (typeFigure) {
            case FigureTypes.ARMY:
                return this.createArmy(who, x, y, figureId);
            case FigureTypes.BUILDING:
                return this.createBuilding(who, x, y, figureId);
            default:
                console.error("Unknown type " + typeFigure);
        }
    }

    static getData(figureId, typeFigure) {
        let objData = FigureManager.instance.getFigure(typeFigure, figureId);
        if (objData === undefined) {
            return null;
        }
        return objData;
    }
}
