import ProgressBar from "../ProgressBar";
import styles from "./MasterBar.module.css";
import {useState} from "react";
import {UiHandlers} from "../../scripts/managers/UiHandlers";

function MasterBar() {
	const [progressValue, setProgressValue] = useState(0);
	const [maxProgressValue, setMaxProgressValue] = useState(10);

	UiHandlers.instance.setWinTargetBar = (value,max)=>{
		setProgressValue(value);
		setMaxProgressValue(max);
	};

	return (
		<div className={styles.box}>
			<ProgressBar size={maxProgressValue} value={progressValue} />
		</div>
	);
}
export default MasterBar;
