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
        this.supplies[SupplyTypes.LAND_ARMY] = new Supply();
        this.supplies[SupplyTypes.AIR_ARMY] = new Supply();
        this.supplies[SupplyTypes.BUILDING] = new Supply();
    }

    setTeam(team) {
        this.team = team;
        let camera = GameManager.instance.sceneManager.camera;
        camera.setSite(this.team);
    }

    setSupply(supplies) {
        for (let name in SupplyTypes) {
            let value = SupplyTypes[name];
            if (supplies[value]) {
                this.supplies[value].supply = supplies[value].supply;
                this.supplies[value].maxSupply = supplies[value].maxSupply;
            }
        }
        UiHandlers.instance.updateSupply();
    }

    setWinProgress(progress) {
        this.winProgress = progress;
        UiHandlers.instance.changeWinTargetBar();
    }

    increaseWinProgress() {
        console.log("INCREASE");
        this.winProgress++;
        UiHandlers.instance.changeWinTargetBar();
    }
}
