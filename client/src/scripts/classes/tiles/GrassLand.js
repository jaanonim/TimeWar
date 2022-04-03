import * as THREE from "three"
import MapLand from "../MapLand";

export default class GrassLand extends MapLand {
    constructor(x, y, width, height) {
        const geometry = new THREE.BoxGeometry(width, 1, height);
        const material = new THREE.MeshBasicMaterial({
            color: 0x8888ff,
            side: THREE.DoubleSide,
        });

        super(x, y, geometry, material);
    }
}