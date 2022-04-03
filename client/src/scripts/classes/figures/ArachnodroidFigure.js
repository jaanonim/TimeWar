import ArmyFigure from "./ArmyFigure";

export default class ArachnodroidFigure extends ArmyFigure {
    constructor(x, y) {
        let capturingMask = [
            [0, 1, 0],
            [1, 1, 1],
            [0, 1, 0]
        ];
        let attackMask = [
            [1, 1, 1, 1, 1],
            [1, 1, 0, 1, 1],
            [1, 0, 0, 0, 1],
            [1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1]
        ];
        let moveMask = [
            [0, 1, 0],
            [1, 1, 1],
            [0, 1, 0]
        ];

        super(x, y, "Arachnodroid", "src", "Lorem Ipsum", capturingMask, 10, attackMask, moveMask, 2, false);
    }
}