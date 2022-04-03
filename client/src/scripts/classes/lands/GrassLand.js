import * as THREE from "three"
import MapLand from "../MapLand";

export default class GrassLand extends MapLand {
    constructor(x, y, mapPositionX, mapPositionY, width, height) {
        const geometry = new THREE.BoxGeometry(width, 1, height);
        const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('textures/grassLand.png') });
        super(x, y, mapPositionX, mapPositionY, width, height, geometry, material);
        this.position.y = -0.5;
    }
}