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

    addFigure(figureObject, figure) {
        let fig = {
            ...figureObject,
            ...figure
        };
        this.mapObjects[figure.mapPositionX][figure.mapPositionY] = fig;
        fig.isMoved = true;
        fig.isAttack = true;
        this.figures.push(fig);
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

    attackFigure(figureMoveData) {
        let figure1 =
            this.mapObjects[figureMoveData.figureX][figureMoveData.figureY];
        let figure2 =
            this.mapObjects[figureMoveData.x][figureMoveData.y];

        figure1.isAttack = true;

        figure2.lives -= figure1.damage;
        figure2.takeDamage = true;
        console.log(figure2, figure1.damage);
        if (figure2.lives <= 0) {
            this.mapObjects[figureMoveData.x][figureMoveData.y] = null;
        }
    }
};
