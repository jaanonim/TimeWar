import FiguresPleaceSection from "../FiguresPleaceSection";
import styles from "./LeftPanel.module.css";

function LeftPanel() {
	return (
		<div className={`${styles.ui} ${styles.placementPanel}`}>
			<FiguresPleaceSection></FiguresPleaceSection>
			<FiguresPleaceSection></FiguresPleaceSection>
			<FiguresPleaceSection></FiguresPleaceSection>
		</div>
	);
}
export default LeftPanel;
