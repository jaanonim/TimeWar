import {
    MapLandTypes
} from "../enums/MapTileTypes";
import Land from "./lands/Land";
import Mountain from "./lands/Mountain";

export default class MapLandFactor {
    createTile(x, y, mapPositionX, mapPositionY, width, height, type) {
        switch (type) {
            case MapLandTypes.LAND:
                return new Land(x, y, mapPositionX, mapPositionY, width, height);
            case MapLandTypes.MOUNTAIN:
                return new Mountain(x, y, mapPositionX, mapPositionY, width, height);
            case MapLandTypes.NOTHING:
                return null;
            default:
                console.error("Unknown type " + type);
        }
    }
}
