import { useState } from "react";
import GameManager from "../../scripts/GameManager";
import { UiHandlers } from "../../scripts/managers/UiHandlers";
import Button from "../Button/Button";
import styles from "./NextTurn.module.css";

function NextTurn() {
    const [isActive, setIsActive] = useState();
    const [inAnim, setInAnim] = useState(false);
    UiHandlers.instance.setIsActiveNextTurnButton = setIsActive;
    UiHandlers.instance.setInAnim = setInAnim;
    return (
        <div className={styles.wrapper}>
            <Button
                color="var(--secend-background)"
                borderColor="var(--third-background)"
                hoverColor="var(--background)"
                borderColorHover="var(--secend-background)"
                shadowColor="var(--background)"
                disabled={!isActive}
                inactive={inAnim}
                onClick={() =>
                    isActive && !inAnim ? GameManager.instance.endTurn() : null
                }
            >
                <div className={styles.box}>
                    {isActive ? "Next turn" : "Wait"}
                </div>
            </Button>
        </div>
    );
}

export default NextTurn;
