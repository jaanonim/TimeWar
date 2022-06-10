import Land from "./Land";

export default class MountainsLand extends Land {
    canFigurePlace(figure) {
        return false;
    }
}
