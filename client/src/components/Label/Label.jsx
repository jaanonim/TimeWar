import ProgressBar from "../ProgressBar";
import styles from "./Label.module.css";

function Label(props) {
  return (
    <div className={styles.container}>
      {props.richVersion ? props.name : null}
      <ProgressBar
        activeColor={props.team == "RED" ? "#ff0000" : "#0000ff"}
        size={props.maxLives}
        value={props.lives}
        variant={"health"}
      ></ProgressBar>
    </div>
  );
}
export default Label;
