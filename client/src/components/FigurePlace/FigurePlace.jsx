import Button from "../Button/Button";
import styles from "./FigurePlace.module.css";

function FigurePlace({ isSelected }) {
	return (
		<div className={styles.wrapper}>
			<Button
				w="calc((20vw - 4rem) / 3)"
				h="calc((20vw - 4rem) / 3)"
				color={isSelected ? "var(--akcent)" : "var(--main)"}
				hoverColor={
					isSelected ? "var(--akcent-dark)" : "var(--main-dark)"
				}
			>
				FigurePleace
			</Button>
		</div>
	);
}
export default FigurePlace;
