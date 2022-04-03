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
        this.width = 50;
        this.height = 50;
    }

    createMap(scene) {
        let widthLength = this.map.length;
        let heightLength = this.map[0].length;
        let tileWidth = this.width / widthLength;
        let tileHeight = this.height / heightLength;
        this.mapObjects = [];
        let landFactory = new MapLandFactor();
        for (let x = -widthLength / 2; x < widthLength / 2; x++) {
            this.mapObjects[x + widthLength / 2] = [];
            for (let y = -heightLength / 2; y < heightLength / 2; y++) {
                let xPos = x * tileWidth + tileWidth / 2;
                let yPos = y * tileHeight + tileHeight / 2;
                let tile = landFactory.createTile(xPos, yPos, tileWidth, tileHeight, this.map[x + widthLength / 2][y + heightLength / 2]);
                this.mapObjects[x + widthLength / 2][y + heightLength / 2] = tile;
                if (tile != null)
                    scene.add(tile);
            }
        }


    }


}
