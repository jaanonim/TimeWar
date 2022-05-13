import GameManager from "../GameManager";
import { UiHandlers } from "../managers/UiHandlers";

export default class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color; // Color as string
        this.team = "";
        this.winProgress = 0;
    }

    setTeam(team) {
        this.team = team;
        let camera = GameManager.instance.sceneManager.camera;
        camera.position.z =
            Math.abs(camera.position.z) * (this.team === "RED" ? 1 : -1);
    }

    increaseWinProgress() {
        this.winProgress++;
        UiHandlers.instance.changeWinTargetBar();
    }
}
