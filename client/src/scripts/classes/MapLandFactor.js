import { MapLandTypes } from "../enums/MapTileTypes";
import Land from "./lands/Land";

export default class MapLandFactor {
	createTile(x, y, mapPositionX, mapPositionY, width, height, type) {
		switch (type) {
			case MapLandTypes.LAND:
				return new Land(
					x,
					y,
					mapPositionX,
					mapPositionY,
					width,
					height,
					"land"
				);
			case MapLandTypes.MOUNTAIN:
				return new Land(
					x,
					y,
					mapPositionX,
					mapPositionY,
					width,
					height,
					"mountain"
				);
			case MapLandTypes.NOTHING:
				return null;
			default:
				console.error("Unknown type " + type);
		}
	}
}
