import styles from "./Tooltip.module.css";

function Tooltip({ children }) {
    return (
        <div className={styles.wrapper}>
            {children}
            <div className={styles.box}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores repudiandae libero dolores? Perspiciatis, maiores?
                Veritatis ea, quidem itaque asperiores earum, maiores ipsum vero
                sapiente, odit pariatur nisi laborum quae inventore!
            </div>
        </div>
    );
}
export default Tooltip;
