export class Supply {
    constructor(startSupply) {
        this.supply = 0;
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
        return true;
    }
    increaseMaxSupply(v=1){
        this.maxSupply += v;
    }

}
