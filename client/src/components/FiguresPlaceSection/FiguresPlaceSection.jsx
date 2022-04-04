import FigurePlace from "../FigurePlace";
import styles from "./FiguresPlaceSection.module.css";

function FiguresPlaceSection() {
	return (
		<div>
			<h3 className={styles.header}>Budynki</h3>
			<div className={styles.items}>
				<FigurePlace></FigurePlace>
				<FigurePlace isSelected={true}></FigurePlace>
				<FigurePlace></FigurePlace>
				<FigurePlace></FigurePlace>
				<FigurePlace></FigurePlace>
				<FigurePlace></FigurePlace>
			</div>
		</div>
	);
}
export default FiguresPlaceSection;
