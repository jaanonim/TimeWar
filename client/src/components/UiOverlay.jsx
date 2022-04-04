import styles from "../styles/UiOverlay.module.css";
import FiguresPleaceSection from "./FiguresPleaceSection";
import NextTurn from "./NextTurn";
import SettingsButton from "./SettingsButton";

function UiOverlay() {
	return (
		<main className={styles.main}>
			<div className={`${styles.ui} ${styles.placementPanel}`}>
				<FiguresPleaceSection></FiguresPleaceSection>
				<FiguresPleaceSection></FiguresPleaceSection>
				<FiguresPleaceSection></FiguresPleaceSection>
			</div>
			<NextTurn />
			<SettingsButton />
		</main>
	);
}
export default UiOverlay;
