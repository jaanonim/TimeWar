import styles from "./Modal.module.css";

function Modal({ children, backgroundClick, show = true }) {
  if (show)
    return (
      <div className={styles.modal}>
        <div className={styles.background} onClick={backgroundClick}></div>
        <div className={styles.box}>{children}</div>
      </div>
    );
  else return <></>;
}
export default Modal;
