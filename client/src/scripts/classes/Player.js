import { SupplyTypes } from "../enums/SupplyTypes";
import GameManager from "../GameManager";
import { UiHandlers } from "../managers/UiHandlers";
import { Supply } from "./Supply";

export default class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color; // Color as string
        this.team = "";
        this.winProgress = 0;
        this.supplies = {};
        this.supplies[SupplyTypes.LAND_ARMY] = new Supply(20);
        this.supplies[SupplyTypes.AIR_ARMY] = new Supply(20);
        this.supplies[SupplyTypes.BUILDING] = new Supply(10);
    }

    setTeam(team) {
        this.team = team;
        let camera = GameManager.instance.sceneManager.camera;
        camera.setSite(this.team);
    }

    increaseWinProgress() {
        this.winProgress++;
        UiHandlers.instance.changeWinTargetBar();
    }
}
