import MapLandFactor from "./classes/MapLandFactor";
import GameManager from "./GameManager";

export default class MapCreator {
    static _instance = null;

    static get instance() {
        if (MapCreator._instance == null) {
            MapCreator._instance = new MapCreator();
        }
        return MapCreator._instance;
    }

    constructor() {
        //TODO: change to get this from server
        this.map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [2, 2, 1, 2, 0, 0, 0, 1, 1, 1],
            [2, 2, 2, 2, 1, 1, 0, 1, 1, 1],
            [1, 2, 2, 2, 2, 1, 0, 1, 1, 1],
            [1, 1, 1, 2, 2, 2, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        this.tileSize = 3.2;
        this.mapObjects = [];
        this.mapWidth = this.map.length * this.tileSize;
        this.mapHeight = this.map[0].length * this.tileSize;
    }

    setMap(map) {
        this.map = map;
    }

    recreateMap(objectMap) {
        console.log(this.mapObjects);
        objectMap.forEach(row => {
            row.forEach(figure => {
                if (figure !== null) {
                    GameManager.instance.placeFigure(
                        figure.figureId,
                        figure.mapPositionX,
                        figure.mapPositionY,
                        figure.figureType,
                        figure.who);
                }
            })

        })
    }

    createMap(scene) {
        let widthLength = this.map.length;
        let heightLength = this.map[0].length;
        let tileWidth = this.mapWidth / widthLength;
        let tileHeight = this.mapHeight / heightLength;
        this.mapObjects = [];
        let landFactory = new MapLandFactor();
        for (let x = 0; x < widthLength; x++) {
            this.mapObjects[x] = [];
            for (let y = 0; y < heightLength; y++) {
                let xPos = (x - widthLength / 2) * tileWidth + tileWidth / 2;
                let yPos = (y - heightLength / 2) * tileHeight + tileHeight / 2;
                let tile = landFactory.createTile(xPos, yPos, x, y, tileWidth, tileHeight, this.map[x][y]);
                this.mapObjects[x][y] = tile;
                if (tile != null)
                    scene.add(tile);
            }
        }
    }
}
