import styles from "../styles/GameComponent.module.css";
import {useEffect, useRef} from "react";
import GameManager from "../scripts/GameManager";

const GameComponent = () => {
    let displayRef = useRef();
    useEffect(() => {
        GameManager.instance.initDisplay(displayRef.current);
    });


    return (
        <div ref={displayRef} className={styles.display}/>
    )
};

export default GameComponent;