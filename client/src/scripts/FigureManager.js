export default class FigureManager {
	//TODO: Now its temporary in the future its load from server or json
	static landArmy = [
		{
			id: 1,
			name: "Arachnodroid",
			image: "Arachnoid",
			description: "Lorem ipsum",
			lives: 10,
			damage: 2,
			isFlyable: false,
			model: "arachnoid",
			capturingMask: [
				[0, 1, 0],
				[1, 1, 1],
				[0, 1, 0],
			],
			attackMask: [
				[1, 1, 1, 1, 1],
				[1, 1, 0, 1, 1],
				[1, 0, 0, 0, 1],
				[1, 1, 0, 1, 1],
				[1, 1, 1, 1, 1],
			],
			moveMask: [
				[0, 1, 0],
				[1, 1, 1],
				[0, 1, 0],
			],
		},
		{
			id: 2,
			name: "RaconBot",
			image: "ReconBot",
			description: "Lorem ipsum2",
			lives: 6,
			damage: 1,
			isFlyable: false,
			model: "reconBot",
			capturingMask: [
				[1, 1, 1],
				[1, 1, 1],
				[1, 1, 1],
			],
			attackMask: [
				[1, 1, 1],
				[1, 0, 1],
				[1, 1, 1],
			],
			moveMask: [
				[1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1],
			],
		},
	];
}
