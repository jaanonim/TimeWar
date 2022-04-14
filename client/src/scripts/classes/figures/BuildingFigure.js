import Figure from "../Figure";
import {FigureTypes} from "../../enums/FigureTypes";
import ModelsManager from "../../ModelsManager";
import {PlayerTeams} from "../../enums/PlayerTeams";

export default class BuildingFigure extends Figure {
    constructor(
        who,
        positionX,
        positionY,
        figureId,
        name,
        image,
        description,
        capturingMask,
        lives,
        modelName,
        scale
    ) {
        super(
            who,
            positionX,
            positionY,
            figureId,
            FigureTypes.BUILDING,
            name,
            image,
            description,
            capturingMask,
            lives
        );
        this.isAttack = false;
        if (ModelsManager.models[modelName] === undefined) {
            console.error("Unknown model", modelName);
            return;
        }
        let model = ModelsManager.getModel(
            modelName,
            this.who.toLowerCase()
        ).clone();
        if (this.who === PlayerTeams.RED) model.rotation.y = Math.PI;
        model.scale.set(scale, scale, scale);
        this.add(model);
    }
}
