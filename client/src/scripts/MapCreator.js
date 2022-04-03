import MapLandFactor from "./classes/MapLandFactor";

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
            [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        this.mapObjects = [];
        this.mapWidth = 50;
        this.mapHeight = 50;
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
                let tile = landFactory.createTile(xPos, yPos, tileWidth, tileHeight, this.map[x][y]);
                this.mapObjects[x][y] = tile;
                if (tile != null)
                    scene.add(tile);
            }
        }
    }
}
