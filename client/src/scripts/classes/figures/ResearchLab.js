import BuildingFigure from "./BuildingFigure";
import GameManager from "../../GameManager";

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
        super(who, positionX, positionY, figureId, name, image, description, capturingMask, -1, modelName, scale)
    }

    renew() {
        if (!this.isAttack && this.who === GameManager.instance.player.team)
            GameManager.instance.player.increaseWinProgress();
        super.renew();
    }

}
