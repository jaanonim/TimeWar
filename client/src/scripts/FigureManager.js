import {FigureTypes} from "./enums/FigureTypes";

export default class FigureManager {
    static _instance = null;

    static get instance() {
        if (FigureManager._instance == null) {
            FigureManager._instance = new FigureManager();
        }
        return FigureManager._instance;
    }

    constructor() {
        this.figures = null;
    }

    getFigure(type, id) {
        switch (type) {
            case FigureTypes.ARMY:
                return this.figures?.army?.find(figure => figure.id === id);
            default:
                console.error("Type not found");
        }
    }

    getLandArmy() {
        return this.figures.army.filter(figure => !figure.isFlyable);
    }

    getAirArmy() {
        return this.figures.army.filter(figure => figure.isFlyable);
    }

    getBuildings() {
        return this.figures.buildings;
    }
}
