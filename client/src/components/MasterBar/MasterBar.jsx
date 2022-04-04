import ProgressBar from "../ProgressBar";
import styles from "./MasterBar.module.css";

function MasterBar() {
	return (
		<div className={styles.box}>
			<ProgressBar size="10" value="5" />
		</div>
	);
}
export default MasterBar;
