import MapCreator from "./MapCreator";
import { HighLightType } from "./enums/HighLightType";

class PathFinding {
    static generateMovePosition(startX, startY, moveMask, figure) {
        if (MapCreator.instance.mapObjects[startX] == null) return;
        let land = MapCreator.instance.mapObjects[startX][startY];
        if (land == null) return;
        if (land.prev == null) {
            land.distance = 1;
            land.hightLightType = HighLightType.MOVE;
        }
        this.#propagate(land, startX + 1, startY, moveMask, figure);
        this.#propagate(land, startX, startY + 1, moveMask, figure);
        this.#propagate(land, startX - 1, startY, moveMask, figure);
        this.#propagate(land, startX, startY - 1, moveMask, figure);
    }

    static #propagate(land, nextX, nextY, moveMask, figure) {
        let x = nextX - figure.mapPositionX + (moveMask.length - 1) / 2;
        let y = nextY - figure.mapPositionY + (moveMask[0].length - 1) / 2;
        if (MapCreator.instance.mapObjects[nextX] == null) return;
        let nextLand = MapCreator.instance.mapObjects[nextX][nextY];
        if (nextLand == null) return;
        if (x < 0 || y < 0 || x >= moveMask.length || y >= moveMask[0].length) {
            return;
        }
        if (!moveMask[x][y]) return;
        if (nextLand.distance !== 0 && land.distance + 1 >= nextLand.distance) {
            return;
        }
        if (!nextLand.canFigurePlace(figure)) return;
        nextLand.distance = land.distance + 1;
        nextLand.prev = land;
        nextLand.hightLightType = HighLightType.MOVE;
        this.generateMovePosition(nextX, nextY, moveMask, figure);
    }
}

export { PathFinding };
