import styles from "./Button.module.css";

function Button({ children, color, hoverColor, shadowSize, shadowColor }) {
	return (
		<div
			className={styles.button}
			style={{
				"--color": color || "var(--main)",
				"--hover": hoverColor || "var(--main-dark)",
				"--shadow": shadowColor || "var(--shadow-color)",
				"--shadow-s": shadowSize || "var(--shadow-size)",
			}}
		>
			{children}
		</div>
	);
}
export default Button;
