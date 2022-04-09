import { useState } from "react";
import GameManager from "../../scripts/GameManager";
import Button from "../Button/Button";
import styles from "./NextTurn.module.css";

function NextTurn() {
	const [isActive, setIsActive] = useState();
	GameManager.instance.setIsActiveNextTurnButton = setIsActive;
	return (
		<div className={styles.wrapper}>
			<Button
				color="var(--secend-background)"
				borderColor="var(--third-background)"
				hoverColor="var(--background)"
				borderColorHover="var(--secend-background)"
				shadowColor="var(--background)"
				disabled={!isActive}
				onClick={() =>
					isActive ? GameManager.instance.endTurn() : null
				}
			>
				<div className={styles.box}>
					{isActive ? "Next turn" : "Wait"}{" "}
				</div>
			</Button>
		</div>
	);
}

export default NextTurn;
