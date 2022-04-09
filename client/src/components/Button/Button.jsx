import styles from "./Button.module.css";

function Button({
	children,
	color,
	hoverColor,
	shadowSize,
	shadowColor,
	w,
	h,
	borderColor,
	borderColorHover,
	onClick,
	disabled,
}) {
	return (
		<div
			className={!disabled ? styles.button : styles.buttonDisabled}
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
			onClick={!disabled ? onClick : () => {}}
		>
			{children}
		</div>
	);
}
export default Button;
