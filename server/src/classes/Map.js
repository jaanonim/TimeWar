const fs = require("fs").promises;

module.exports = class Room {
    constructor() {
        this.mapStruct = [];
        this.mapObjects = [];
        this.figures = [];
    }

    async loadMap(name) {
        this.mapStruct = JSON.parse(await fs.readFile(`maps/${name}.json`));
        this.mapObjects = [];
        this.mapStruct.forEach((row, i) => {
            this.mapObjects[i] = [];
            row.forEach((cell, j) => (this.mapObjects[i][j] = null));
        });
    }

    addFigure(figure) {
        this.mapObjects[figure.mapPositionX][figure.mapPositionY] = figure;
        this.figures.isMoved = false;
        this.figures.push(figure);
    }
    moveFigure(figureMoveData) {
        let figure =
            this.mapObjects[figureMoveData.figureX][figureMoveData.figureY];
        figure.mapPositionX = figureMoveData.newX;
        figure.mapPositionY = figureMoveData.newY;
        figure.isMoved = true;
        this.mapObjects[figureMoveData.newX][figureMoveData.newY] = figure;

        this.mapObjects[figureMoveData.figureX][figureMoveData.figureY] = null;
    }
};
