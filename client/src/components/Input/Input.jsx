import styles from "./Input.module.css";

function Input({
  color,
  hoverColor,
  shadowSize,
  shadowColor,
  w,
  h,
  borderColor,
  borderColorHover,
  onInput,
  autoFocus,
  placeholder,
  maxLength,
  textAlign,
  textTransform,
  onEnter,
  readonly,
  value,
  onClick,
}) {
  return (
    <div
      className={styles.box}
      style={{
        "--color": color || "var(--main)",
        "--hover": hoverColor || "var(--main-dark)",
        "--shadow": shadowColor || "var(--shadow-color)",
        "--shadow-s": shadowSize || "var(--shadow-size)",
        "--w": w || "100%",
        "--h": h || "",
        "--borderColor": borderColor || "var(--text)",
        "--borderColorHover": borderColorHover || "var(--text)",
      }}
    >
      <input
        onKeyUp={(event) => {
          if (event.keyCode === 13) {
            event.preventDefault();
            onEnter();
          }
        }}
        value={value}
        readOnly={readonly}
        className={styles.input}
        onInput={onInput}
        placeholder={placeholder}
        autoFocus={autoFocus}
        maxLength={maxLength}
        style={{
          textAlign: textAlign || "left",
          textTransform: textTransform,
        }}
        onClick={onClick}
      />
    </div>
  );
}
export default Input;
