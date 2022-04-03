import GrassLand from "./lands/GrassLand";
import {MapLandTypes} from "../enums/MapTileTypes";

export default class MapLandFactor {
    createTile(x, y, width, height, type) {
        switch (type) {
            case MapLandTypes.GRASS:
                return new GrassLand(x, y, width, height);
            case MapLandTypes.NOTHING:
                return null;
            default:
                console.error("Unknown type " + type);
        }
    }
}
