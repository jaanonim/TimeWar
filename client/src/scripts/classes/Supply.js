import { UiHandlers } from "../managers/UiHandlers";

export class Supply {
    constructor(startSupply = 0) {
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
        return true;
    }

    increaseMaxSupply(v = 1) {
        this.maxSupply += v;
    }

    decreaseMaxSupply(v = 1) {
        this.maxSupply -= v;
        if (this.supply > this.maxSupply) {
            this.supply = this.maxSupply;
        }
    }
}
