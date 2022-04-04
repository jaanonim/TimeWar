import styles from "../styles/FiguresPleaceSection.module.css";
import FigurePleace from "./FigurePleace";

function FiguresPleaceSection() {
	return (
		<div>
			<h3 className={styles.header}>Budynki</h3>
			<div className={styles.items}>
				<FigurePleace></FigurePleace>
				<FigurePleace isSelected={true}></FigurePleace>
				<FigurePleace></FigurePleace>
				<FigurePleace></FigurePleace>
				<FigurePleace></FigurePleace>
				<FigurePleace></FigurePleace>
			</div>
		</div>
	);
}
export default FiguresPleaceSection;
