import styles from "./ProgressBar.module.css";

function ProgressBar({ size, value }) {
  size = parseInt(size);
  value = parseInt(value);
  return size < value || value < 0 ? null : (
    <div className={styles.container}>
      {[...Array(value).keys()].map((i) => (
        <div className={styles.block + " " + styles.active} key={i}></div>
      ))}
      {[...Array(size - value).keys()].map((i) => (
        <div className={styles.block} key={i}></div>
      ))}
    </div>
  );
}
export default ProgressBar;
