import LabelComponent from "../../components/Label";
import Label from "./Label";

export default class FigureLabel extends Label {
    constructor(figure) {
        super();
        this.figure = figure;
        console.log(this.figure.name, this.figure);
        this.setComponent(() =>
            LabelComponent({
                name: this.figure.name,
                lives: this.figure.lives,
                maxLives: this.figure.maxLives,
            })
        );
    }

    update() {
        super.update(this.figure);
    }
}
