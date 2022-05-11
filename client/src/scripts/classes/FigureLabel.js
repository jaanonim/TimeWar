import LabelComponent from "../../components/Label";
import Label from "./Label";

export default class FigureLabel extends Label {
    constructor(figure) {
        super();
        this.figure = figure;
        this.setComponent(() =>
            LabelComponent({
                name: this.figure.name,
                lives: this.figure.lives,
                maxLives: this.figure.maxLives,
                team: this.figure.who,
                richVersion: this.figure.highlighted,
            })
        );
    }

    update() {
        super.update(this.figure);
    }

    destroy() {
        super.destroy();
        this.figure = null;
    }
}
