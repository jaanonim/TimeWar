import { useState } from "react";
import styles from "./Checkbox.module.css";

function Checkbox(props) {
  const [value, setValue] = useState(props.checked ? props.checked : false);

  return (
    <label className={"noselect " + styles.container}>
      {props.children}
      <input
        type="checkbox"
        checked={props.checked}
        onChange={(v) => {
          props.onChange(v.target.checked);
          setValue(v.target.checked);
        }}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
}
export default Checkbox;
