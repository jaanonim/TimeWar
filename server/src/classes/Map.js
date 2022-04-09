const fs = require('fs').promises;

module.exports = class Room {
    constructor() {
        this.mapStruct = [];
        this.mapObjects = [];
    }

    async loadMap(name) {
        this.mapStruct = JSON.parse(await fs.readFile(`maps/${name}.json`));
        this.mapObjects = [];
        this.mapStruct.forEach((row, i) => {
            this.mapObjects[i] = [];
            row.forEach((cell, j) => this.mapObjects[i][j] = null)
        });
    }

    addFigure(figure) {
        console.log(figure);
        this.mapObjects[figure.mapPositionX][figure.mapPositionY] = figure;
    }

    /*
    *       figureX: oldX,
            figureY: oldY,
            newX: x,
            newY: y
    * */
    moveFigure(figureMoveData) {
        this.mapObjects[figureMoveData.figureX][figureMoveData.figureY] = this.mapObjects[figureMoveData.newX][figureMoveData.newY];
        this.mapObjects[figureMoveData.figureX][figureMoveData.figureY] = null;
    }
};
