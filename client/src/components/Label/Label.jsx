import ProgressBar from "../ProgressBar";
import styles from "./Label.module.css";

function Label(props) {
    switch (props.type) {
        case "lab":
            const color = props.data.atacked
                ? ""
                : props.team == "RED"
                ? styles.red
                : styles.blue;
            return (
                <div className={styles.container}>
                    {props.richVersion ? props.name : null}
                    <div className={styles.circle + " " + color}></div>
                </div>
            );

        default:
            return (
                <div className={styles.container}>
                    {props.richVersion ? props.name : null}
                    <div className={styles.progress}>
                        <ProgressBar
                            activeColor={
                                props.team == "RED" ? "#ff0000" : "#0000ff"
                            }
                            size={props.maxLives}
                            value={props.lives}
                            variant={"health"}
                        ></ProgressBar>
                    </div>
                </div>
            );
    }
}
export default Label;
