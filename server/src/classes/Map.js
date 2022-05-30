const databaseController = require("./DatabaseController");
module.exports = class Room {
    constructor() {
        this.mapStruct = [];
        this.mapObjects = [];
        this.figures = [];
        this.mapData = {};
    }

    async loadMap() {
        let maps = await databaseController.getMapList();
        this.mapData = maps[Math.floor(Math.random() * maps.length)];
        this.mapStruct = this.mapData.map;
        this.mapObjects = [];
        this.mapStruct.forEach((row, i) => {
            this.mapObjects[i] = [];
            row.forEach((cell, j) => (this.mapObjects[i][j] = null));
        });
    }

    addFigure(figureObject, figure) {
        let fig = {
            ...figureObject,
            ...figure,
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

    attackFigure(figureAttackData) {
        let figure1 =
            this.mapObjects[figureAttackData.figureX][figureAttackData.figureY];
        let figure2 = this.mapObjects[figureAttackData.x][figureAttackData.y];

        figure1.isAttack = true;

        figure2.takeDamage = true;
        if (figure2.lives !== -1) {
            figure2.lives -= figure1.damage;
            console.log(figure2, figure1.damage);
            if (figure2.lives <= 0) {
                this.mapObjects[figureAttackData.x][figureAttackData.y] = null;
            }
        }
    }
};
