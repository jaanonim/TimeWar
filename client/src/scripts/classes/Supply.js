import {UiHandlers} from "../managers/UiHandlers";

export class Supply {
    constructor(startSupply) {
        this.supply = startSupply;
        this.maxSupply = startSupply;
    }

    reset() {
        this.supply = this.maxSupply;
    }

    takeSupply(v) {
        if (this.supply < v) {
            return false;
        }
        this.supply -= v;
        UiHandlers.instance.updateSupply();
        console.log(this.supply);
        return true;
    }

    increaseMaxSupply(v = 1) {
        this.maxSupply += v;
    }

}
