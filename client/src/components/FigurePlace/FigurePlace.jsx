import GameManager from "../../scripts/GameManager";
import styles from "./FigurePlace.module.css";

function FigurePlace({ isSelected, figure, onClick }) {
	return (
		<div
			className={styles.box + " " + (isSelected ? styles.selected : "")}
			style={{
				backgroundImage: `url(/img/thumbnails/${figure.image}${
					GameManager.instance.player.team == ""
						? ""
						: "_" + GameManager.instance.player.team.toLowerCase()
				}.png)`,
			}}
			onClick={() => onClick(figure.id)}
		></div>
	);
}

export default FigurePlace;
