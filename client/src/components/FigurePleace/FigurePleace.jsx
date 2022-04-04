import styles from "./FigurePleace.module.css";

function FigurePleace(props) {
	return (
		<div
			className={`${styles.item} ${
				props.isSelected ? styles["item-selected"] : ""
			}`}
		>
			FigurePleace
		</div>
	);
}
export default FigurePleace;
