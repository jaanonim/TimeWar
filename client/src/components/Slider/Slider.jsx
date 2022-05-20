import { useState } from "react";
import styles from "./Slider.module.css";

function Slider(props) {
  const [value, setValue] = useState(props.value ? props.value : 50);

  return (
    <label className={"noselect " + styles.container}>
      {props.children}
      <div className={styles.box}>
        {props.value}
        <input
          type="range"
          min={props.min}
          max={props.max}
          step={props.step}
          value={props.value}
          onChange={(e) => {
            setValue(e.target.value);
            props.onChange(e.target.value);
          }}
        ></input>
      </div>
    </label>
  );
}
export default Slider;
