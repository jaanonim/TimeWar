import styles from "./FigurePlace.module.css";

function FigurePlace({ isSelected, figure, onClick }) {
	return (
		<div
			className={styles.box + " " + (isSelected ? styles.selected : "")}
			style={{
				backgroundImage: `url(/img/thumbnails/${figure.image})`,
			}}
			onClick={() => onClick(figure.id)}
		></div>
	);
}

export default FigurePlace;
