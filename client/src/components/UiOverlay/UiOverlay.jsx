import LeftPanel from "../LeftPanel";
import NextTurn from "../NextTurn";
import SettingsButton from "../SettingsButton";
import styles from "./UiOverlay.module.css";

function UiOverlay() {
	return (
		<main className={styles.main}>
			<LeftPanel />
			<NextTurn />
			<SettingsButton />
		</main>
	);
}
export default UiOverlay;
