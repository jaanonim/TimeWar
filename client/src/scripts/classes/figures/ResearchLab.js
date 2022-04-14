import BuildingFigure from "./BuildingFigure";

export default class ResearchLab extends BuildingFigure {
    constructor(
        who,
        positionX,
        positionY,
        figureId,
        name,
        image,
        description,
        capturingMask,
        modelName,
        scale) {
        super(who,positionX,positionY,figureId,name,image,description,capturingMask,modelName,scale)
    }



}
