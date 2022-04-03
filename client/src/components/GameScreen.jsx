import styles from "../styles/GameScreen.module.css";
import {useEffect, useRef} from "react";
import GameManager from "../scripts/GameManager";

const GameScreen = () => {
    let displayRef = useRef();
    useEffect(() => {
        GameManager.instance.initDisplay(displayRef.current);
    });


    return (
        <div ref={displayRef} className={styles.display}/>
    )
};

export default GameScreen;
