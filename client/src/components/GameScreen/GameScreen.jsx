import React, {useEffect, useRef} from "react";
import GameManager from "../../scripts/GameManager";
import styles from "./GameScreen.module.css";

function GameScreen() {
    let displayRef = useRef();
    useEffect(() => {
        GameManager.instance.initDisplay(displayRef.current);
    });

    return <div ref={displayRef} className={styles.display}/>;
}

export default GameScreen;
