import TurnInfo from "../TurnInfo";
import styles from "./TopInfo.module.css";
import TurnTimer from "../TurnTimer";

function TopInfo() {
	return (
		<div className={styles.box}>
			<div className={styles.nicks}>
				<div className={styles.nickLeft}>jaanonim</div>
				<div className={styles.vs}>vs</div>
				<div className={styles.nickRight}>n2one</div>
			</div>

			<TurnInfo />
			<TurnTimer />
		</div>
	);
}
export default TopInfo;
