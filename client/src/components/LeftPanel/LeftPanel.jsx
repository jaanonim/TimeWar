import FiguresPlaceSection from "../FiguresPlaceSection";
import styles from "./LeftPanel.module.css";

function LeftPanel() {
	return (
		<div className={`${styles.ui} ${styles.placementPanel}`}>
			<FiguresPlaceSection></FiguresPlaceSection>
			<FiguresPlaceSection></FiguresPlaceSection>
			<FiguresPlaceSection></FiguresPlaceSection>
		</div>
	);
}
export default LeftPanel;
