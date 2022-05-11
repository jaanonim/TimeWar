import GameManager from "../GameManager";

const yourTurnText = "You Turn";
const waitingTurnText = "Wait for Your Turn";

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
        this.setWinTargetBar = null;
    }

    onSelectFigureInUI(newId, type) {
        GameManager.instance.selectFigureIdInUI = newId;
        GameManager.instance.selectFigureTypeInUI = type;
    }

    changeWinTargetBar() {
        UiHandlers.instance.setWinTargetBar(GameManager.instance.player.winProgress, GameManager.instance.winTarget);
    }

    changeTurnText(turn) {
        UiHandlers.instance.setTurnInfo(
            GameManager.instance.player.team === turn ? yourTurnText : waitingTurnText
        );
        UiHandlers.instance.setIsActiveNextTurnButton(GameManager.instance.player.team === turn);
    }
}
