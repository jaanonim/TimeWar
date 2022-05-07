import styles from "./TurnInfo.module.css";
import {useState} from "react";
import {UiHandlers} from "../../scripts/managers/UiHandlers";

function TurnInfo() {
	const [turnInfo,setTurnInfo] = useState("");
	UiHandlers.instance.setTurnInfo = setTurnInfo;
	return <div className={styles.box}>{turnInfo}</div>;
}
export default TurnInfo;
