import * as THREE from "three"

export default class MapLand extends THREE.Mesh {
    constructor(x, y, geometry, material) {
        super(geometry, material);
        this.position.set(x, 0, y);
    }
}
