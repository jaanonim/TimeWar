import GameManager from "../GameManager";

let runWhenExist = async (exist, func) => {
    while (exist == null) {
        await new Promise((resolve) => setTimeout(() => resolve(), 500));
    }
    func();
};

const runWhenTeamIsSet = async (func) => {
    while (GameManager.instance.player.team == "") {
        await new Promise((resolve) => setTimeout(() => resolve(), 500));
    }
    func(GameManager.instance.player.team);
};
export { runWhenExist, runWhenTeamIsSet };
