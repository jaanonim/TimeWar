import Button from "../Button/Button";
import styles from "./NextTurn.module.css";
import GameManager from "../../scripts/GameManager";
import {useState} from "react";

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
                onClick={() => isActive ? GameManager.instance.endTurn() : null}
            >
                <div className={styles.box}>{isActive ? "Next turn" : "WAIT"} </div>
            </Button>
        </div>
    );
}

export default NextTurn;
