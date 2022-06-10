import MapCreator from "./MapCreator";
import { HighLightType } from "./enums/HighLightType";

class PathFinding {
    static generateMovePosition(startX, startY, moveMask, figure) {
        // for (let x = 0; x < this.moveMask.length; x++) {
        //     for (let y = 0; y < this.moveMask[0].length; y++) {
        //         let xPos =
        //             this.mapPositionX - (this.moveMask.length - 1) / 2 + x;
        //         let yPos =
        //             this.mapPositionY - (this.moveMask[0].length - 1) / 2 + y;
        //         if (MapCreator.instance.mapObjects[xPos] == null) break;
        //         let object = MapCreator.instance.mapObjects[xPos][yPos];
        //         if (object != null) {
        //             if (this.moveMask[x][y]) {
        //                 object.hightLightType = HighLightType.MOVE;
        //                 object.unHighLight();
        //             }
        //         }
        //     }
        // }
        if (MapCreator.instance.mapObjects[startX] == null) return;
        let land = MapCreator.instance.mapObjects[startX][startY];
        if (land == null) return;
        land.distance = 1;
        land.hightLightType = HighLightType.MOVE;
        // console.log("OK", MapCreator.instance.mapObjects, startX, startY);
        this.#propagate(land, startX + 1, startY, moveMask, figure);
        this.#propagate(land, startX, startY + 1, moveMask, figure);
        this.#propagate(land, startX - 1, startY, moveMask, figure);
        this.#propagate(land, startX, startY - 1, moveMask, figure);
    }

    static #propagate(land, nextX, nextY, moveMask, figure) {
        let x = figure.mapPositionX - nextX + (moveMask.length - 1) / 2;
        let y = figure.mapPositionY - nextY + (moveMask[0].length - 1) / 2;
        if (MapCreator.instance.mapObjects[nextX] == null) return;
        let nextLand = MapCreator.instance.mapObjects[nextX][nextY];
        if (nextLand == null) return;
        if (x < 0 || y < 0 || x >= moveMask.length || y >= moveMask[0].length) {
            return;
        }
        // console.log(x, y, moveMask[x][y], !moveMask[x][y]);
        if (!moveMask[x][y]) return;
        if (nextLand.distance !== 0 && land.distance + 1 >= nextLand.distance) {
            return;
        }
        if (!nextLand.canFigurePlace(figure)) return;

        nextLand.distance = land.distance + 1;
        nextLand.prev = land;
        nextLand.hightLightType = HighLightType.MOVE;
        if (nextX === 9 && nextY === 19) {
            console.log(nextLand, land, x, y, moveMask[x][y]);
        }
        // land.next = nextLand;\
        this.generateMovePosition(nextX, nextY, moveMask, figure);
    }
}

export { PathFinding };
