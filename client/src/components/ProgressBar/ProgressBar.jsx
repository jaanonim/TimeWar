import styles from "./ProgressBar.module.css";

function ProgressBar({ size, value, variant = "normal", activeColor }) {
    size = parseInt(size);
    value = parseInt(value);
    return size < value || value < 0 ? null : (
        <div
            className={styles.container + " " + styles[variant]}
            style={{
                "--color": activeColor,
            }}
        >
            {[...Array(value).keys()].map((i) => (
                <div
                    className={styles.block + " " + styles.active}
                    key={i}
                ></div>
            ))}
            {[...Array(size - value).keys()].map((i) => (
                <div className={styles.block} key={i}></div>
            ))}
        </div>
    );
}
export default ProgressBar;
