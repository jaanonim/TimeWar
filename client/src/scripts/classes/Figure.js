import * as THREE from "three"

export default class Figure extends THREE.Mesh {
    constructor(positionX, positionY, image, description, capturingMask, geometry, material) {
        super(geometry, material);
        this.position.set(positionX, 0, positionY);
        this.image = image;
        this.description = description;
        this.capturingMask = capturingMask;
    }

}