import ReactDOM from "react-dom";

export default class LabelsManager {
    static _instance = null;

    static get instance() {
        if (LabelsManager._instance == null) {
            new LabelsManager();
        }
        return LabelsManager._instance;
    }

    constructor(displayElement) {
        return new Promise(async (resolve) => {
            await this.initDisplay(displayElement);
            LabelsManager._instance = this;
            resolve(this);
        });
    }

    async initDisplay(displayElement) {
        this.domElement = document.createElement("div");
        this.domElement.classList.add("labels");
        this.domElement.classList.add("noselect");
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

    destroy() {
        this.domElement.remove();
    }
}
