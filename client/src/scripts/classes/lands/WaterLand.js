import Land from "./Land";

export default class WaterLand extends Land {
    canFigurePlace(figure) {
        if (!figure.isFlyable) return false;
        return super.canFigurePlace(figure);
    }
}
