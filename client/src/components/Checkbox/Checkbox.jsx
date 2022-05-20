import styles from "./Checkbox.module.css";

function Checkbox(props) {
  return (
    <div className={styles.box}>
      <label className={"noselect " + styles.container}>
        {props.children}
        <input
          type="checkbox"
          checked={props.checked}
          onChange={(v) => {
            props.onChange(v.target.checked);
          }}
        />
        <span className={styles.checkmark}></span>
      </label>
    </div>
  );
}
export default Checkbox;
