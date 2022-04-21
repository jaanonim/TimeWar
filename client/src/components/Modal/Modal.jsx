import styles from "./Modal.module.css";

function Modal({ children, backgroundClick, show = true }) {
  if (show)
    return (
      <div className={styles.modal}>
        <div class={styles.background} onClick={backgroundClick}></div>
        <div class={styles.box}>{children}</div>
      </div>
    );
  else return <></>;
}
export default Modal;
