import GameManager from "../GameManager";
import { runWhenExist } from "../utilities/RunWhenExist";

export class UiHandlers {
    static _instance = null;

    static get instance() {
        if (UiHandlers._instance == null) {
            UiHandlers._instance = new UiHandlers();
        }
        return UiHandlers._instance;
    }

    constructor() {
        this.setFiguresOnMenu = null;
        this.setIsActiveNextTurnButton = null;
        this.setSupplyOnMenu = null;
        this.setWinTargetBar = null;
        this.setInfoRoomPanel = null;
        this.setVersusInfo = null;
        this.setEndPanel = null;
    }

    onSelectFigureInUI(newId, type) {
        GameManager.instance.setSelectFigureInUI(newId, type);
        GameManager.instance.unselectFigure();
    }

    updateSupply() {
        let gm = GameManager.instance;
        let player = gm.player;
        let result = {};
        for (let supplyName in player.supplies) {
            let supply = player.supplies[supplyName];
            result[supplyName] = {
                value: supply.supply,
                max: supply.maxSupply,
            };
        }
        runWhenExist(this.setSupplyOnMenu, () => this.setSupplyOnMenu(result));
    }

    changeWinTargetBar() {
        UiHandlers.instance?.setWinTargetBar(
            GameManager.instance.player.winProgress,
            GameManager.instance.winTarget
        );
    }

    changeTurnText(turn) {
        UiHandlers.instance?.setIsActiveNextTurnButton(
            GameManager.instance.player.team === turn
        );
        runWhenExist(UiHandlers.instance.disableLeftButtons, () =>
            UiHandlers.instance.disableLeftButtons(
                GameManager.instance.player.team !== turn
            )
        );
    }
}
