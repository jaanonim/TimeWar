import GameManager from "../../GameManager";
import BuildingFigure from "./BuildingFigure";

export default class ResearchLab extends BuildingFigure {
    constructor(who, positionX, positionY, data) {
        super(who, positionX, positionY, data);
        this.lable.setType("lab");
    }

    renew() {
        if (!this.takeDamage && this.who === GameManager.instance.player.team)
            GameManager.instance.player.increaseWinProgress();
        super.renew();
        this.lable.setData({
            atacked: false,
        });
    }

    makeDamage(damage) {
        this.takeDamage = true;
        this.lable.setData({
            atacked: true,
        });
    }

    placeAction() {}
}
