export default class FigureManager {
    //TODO: Now its temporary in the future its load from server or json
    static landArmy = [
        {

            id: 1,
            name: "Arachnodroid",
            image: "src",
            description: "Lorem ipsum",
            lives: 10,
            damage: 2,
            isFlyable: false,
            model: "arachnoid",
            capturingMask: [
                [0, 1, 0],
                [1, 1, 1],
                [0, 1, 0]
            ],
            attackMask: [
                [1, 1, 1, 1, 1],
                [1, 1, 0, 1, 1],
                [1, 0, 0, 0, 1],
                [1, 1, 0, 1, 1],
                [1, 1, 1, 1, 1]
            ],
            moveMask: [
                [0, 1, 0],
                [1, 1, 1],
                [0, 1, 0]
            ]
        },
        {

            id: 2,
            name: "Arachnodroid",
            image: "src",
            description: "Lorem ipsum",
            lives: 10,
            damage: 2,
            isFlyable: false,
            model: "arachnoid",
            capturingMask: [
                [0, 1, 0],
                [1, 1, 1],
                [0, 1, 0]
            ],
            attackMask: [
                [1, 1, 1, 1, 1],
                [1, 1, 0, 1, 1],
                [1, 0, 0, 0, 1],
                [1, 1, 0, 1, 1],
                [1, 1, 1, 1, 1]
            ],
            moveMask: [
                [0, 1, 0],
                [1, 1, 1],
                [0, 1, 0]
            ]
        }
    ]
}
