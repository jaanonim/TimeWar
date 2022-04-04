import TurnTimer from "../TurnTimer";
import styles from "./TopInfo.module.css";

function TopInfo() {
	return (
		<div className={styles.box}>
			<div className={styles.nicks}>
				<div className={styles.nickLeft}>jaanonim</div>
				<div className={styles.vs}>vs</div>
				<div className={styles.nickRight}>n2one</div>
			</div>

			<TurnTimer />
		</div>
	);
}
export default TopInfo;
