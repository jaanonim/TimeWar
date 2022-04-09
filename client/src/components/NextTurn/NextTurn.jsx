import Button from "../Button/Button";
import styles from "./NextTurn.module.css";
import GameManager from "../../scripts/GameManager";

function NextTurn() {
	return (
		<div className={styles.wrapper}>
			<Button
				color="var(--secend-background)"
				borderColor="var(--third-background)"
				hoverColor="var(--background)"
				borderColorHover="var(--secend-background)"
				shadowColor="var(--background)"
				onClick={()=>GameManager.instance.endTurn()}
			>
				<div className={styles.box}>Next turn</div>
			</Button>
		</div>
	);
}
export default NextTurn;
