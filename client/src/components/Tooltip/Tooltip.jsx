import styles from "./Tooltip.module.css";

function Tooltip({ children, figure }) {
    return (
        <div className={styles.wrapper}>
            {children}
            <div className={styles.box}>
                <h3>{figure.name}</h3>
                <p>{figure.description}</p>
                <ul>
                    <li>Price: {figure.price}</li>
                    <li>Lives: {figure.maxLives}</li>
                    {figure.damage ? <li>Damage: {figure.damage}</li> : null}
                </ul>
            </div>
        </div>
    );
}
export default Tooltip;
