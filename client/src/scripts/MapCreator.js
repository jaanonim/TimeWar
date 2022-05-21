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
        this.tileSize = 3.2;
        this.mapObjects = [];
        this.mapWidth = 0;
        this.mapHeight = 0;
    }

    unCapturingMap() {
        this.mapObjects.forEach((row) => {
            row.forEach((land) => {
                if (land !== null) {
                    land.unCapture();
                }
            });
        });
    }

    setMap(map) {
        this.map = map;
        this.mapWidth = this.map.length * this.tileSize;
        this.mapHeight = this.map[0].length * this.tileSize;
    }

    recreateMap(objectMap) {
        objectMap.forEach((row) => {
            row.forEach((figure) => {
                if (figure !== null) {
                    let object = GameManager.instance.placeFigure(
                        figure.who,
                        figure.mapPositionX,
                        figure.mapPositionY,
                        figure.figureId,
                        figure.figureType,
                        false
                    );
                    object.isMoved = figure.isMoved;
                    object.isAttack = figure.isAttack;
                }
            });
        });
    }

    createMap(scene) {
        let widthLength = this.map.length;
        let heightLength = this.map[0].length;
        let tileWidth = this.mapWidth / widthLength;
        let tileHeight = this.mapHeight / heightLength;
        if (this.mapObjects.length !== 0) {
            this.mapObjects.forEach((row) => {
                row.forEach((land) => {
                    if (land !== null) {
                        if (land.figure !== null) {
                            scene.remove(land.figure);
                        }
                        scene.remove(land);
                    }
                });
            });
        }
        this.mapObjects = [];
        let landFactory = new MapLandFactor();
        for (let x = 0; x < widthLength; x++) {
            this.mapObjects[x] = [];
            for (let y = 0; y < heightLength; y++) {
                let xPos = (x - widthLength / 2) * tileWidth + tileWidth / 2;
                let yPos = (y - heightLength / 2) * tileHeight + tileHeight / 2;
                let tile = landFactory.createTile(
                    xPos,
                    yPos,
                    x,
                    y,
                    tileWidth,
                    tileHeight,
                    this.map[x][y]
                );
                this.mapObjects[x][y] = tile;
                if (tile != null) scene.add(tile);
            }
        }
    }
}
