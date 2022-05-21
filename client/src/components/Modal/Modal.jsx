import styles from "./Modal.module.css";

function Modal({ children, backgroundClick, backgroundColor, show = true }) {
  if (show)
    return (
      <div className={styles.modal}>
        <div
          className={styles.background}
          onClick={backgroundClick}
          style={{
            backgroundColor: backgroundColor || "rgba(0, 0, 0, 0.3)",
          }}
        ></div>
        <div className={styles.box}>{children}</div>
      </div>
    );
  else return <></>;
}
export default Modal;
