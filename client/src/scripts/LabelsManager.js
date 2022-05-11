import ReactDOM from "react-dom";

export default class LabelsManager {
    static _instance = null;

    static get instance() {
        if (LabelsManager._instance == null) {
            LabelsManager._instance = new LabelsManager();
        }
        return LabelsManager._instance;
    }

    constructor() {}

    async initDisplay(displayElement) {
        this.domElement = document.createElement("div");
        this.domElement.classList.add("labels");
        displayElement.appendChild(this.domElement);
    }

    createLabel() {
        const label = document.createElement("div");
        label.classList.add("label");
        this.domElement.appendChild(label);
        return new DomLabel(label);
    }
}

class DomLabel {
    constructor(domElement) {
        this.domElement = domElement;
    }

    render(jsx) {
        ReactDOM.render(jsx, this.domElement);
    }
}
