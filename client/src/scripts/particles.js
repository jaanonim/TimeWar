import ParticleSystem, {
    Body,
    BoxZone,
    Emitter,
    Life,
    Mass,
    MeshRenderer,
    Position,
    RadialVelocity,
    Radius,
    Rate,
    Rotate,
    Scale,
    Span,
    Vector3D,
} from "three-nebula";

let THREE;

const createMesh = ({ geometry, material }) =>
    new THREE.Mesh(geometry, material);

const createEmitter = ({ body }) => {
    const emitter = new Emitter();

    return emitter
        .setRate(new Rate(new Span(10, 20), new Span(0.1, 0.25)))
        .setLife(1)
        .addInitializers([
            new Mass(1),
            new Radius(1),
            new Life(2, 4),
            new Body(body),
            new Position(new BoxZone(1)),
            new RadialVelocity(1, new Vector3D(0, 1, 0), 360),
        ])
        .addBehaviours([new Rotate("random", "random"), new Scale(1, 0.1)])
        .setPosition(new Vector3D(30, 0, 0))
        .emit();
};

export default async (three, { scene, camera }) => {
    THREE = three;

    const system = new ParticleSystem();

    const cubeEmitter = createEmitter({
        body: createMesh({
            geometry: new THREE.BoxGeometry(1, 1, 1),
            material: new THREE.MeshLambertMaterial({ color: "#00ffcc" }),
        }),
    });

    return system
        .addEmitter(cubeEmitter)
        .addRenderer(new MeshRenderer(scene, THREE));
};
