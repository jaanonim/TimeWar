import { useState } from "react";
import { UiHandlers } from "../../scripts/managers/UiHandlers";
import styles from "./TurnTimer.module.css";

function TurnTimer() {
    const [time, setTime] = useState(0);
    UiHandlers.instance.setTurnTimer = setTime;

    return (
        <div className={styles.box}>
            {Math.round(time / 60 - 0.5)}:
            {time % 60 < 10 ? "0" + (time % 60) : time % 60}
        </div>
    );
}
export default TurnTimer;
