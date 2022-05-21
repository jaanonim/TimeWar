import TurnTimer from "../TurnTimer";
import styles from "./TopInfo.module.css";
import {UiHandlers} from "../../scripts/managers/UiHandlers";
import {useState} from "react";

function TopInfo() {
    const [nicks, setNicks] = useState(["", ""]);
    UiHandlers.instance.setVersusInfo = (myNick, opponentNick) => {
        setNicks([
            myNick, opponentNick
        ])
    };
    return (
        <div className={styles.box}>
            <div className={styles.nicks}>
                <div className={styles.nickLeft}>{nicks[0]}</div>
                <div className={styles.vs}>vs</div>
                <div className={styles.nickRight}>{nicks[1]}</div>
            </div>
            
            <TurnTimer/>
        </div>
    );
}

export default TopInfo;
