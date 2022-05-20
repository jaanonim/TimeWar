import GameManager from "../../GameManager";
import BuildingFigure from "./BuildingFigure";

export default class ResearchLab extends BuildingFigure {
    constructor(who, positionX, positionY, data) {
        super(who, positionX, positionY, data);
    }

    renew() {
        if (!this.takeDamage && this.who === GameManager.instance.player.team)
            GameManager.instance.player.increaseWinProgress();
        super.renew();
    }

    placeAction() {
    }
}
