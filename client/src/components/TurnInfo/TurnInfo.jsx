import styles from "./TurnInfo.module.css";
import GameManager from "../../scripts/GameManager";
import {useState} from "react";

function TurnInfo() {
	const [turnInfo,setTurnInfo] = useState("");
	GameManager.instance.setTurnInfo = setTurnInfo;
	return <div className={styles.box}>{turnInfo}</div>;
}
export default TurnInfo;
