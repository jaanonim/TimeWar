import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/MainPage.module.css";

function MainPage() {
	return (
		<div className={styles.container}>
			<nav>
				<h1 className={styles.logo}>TimeWar</h1>
				<ul className={styles.navList}>
					<li className={styles.navItem}>
						<Link className={styles.navLink} to="/game">
							Game
						</Link>
					</li>
					<li className={styles.navItem}>
						<Link className={styles.navLink} to="/settings">
							Settings
						</Link>
					</li>
					<li className={styles.navItem}>
						<Link className={styles.navLink} to="/about">
							About
						</Link>
					</li>
				</ul>
				<footer>jaanonim &amp; n2one &copy; 2021</footer>
			</nav>
			<aside>
				<h2>TODO: Some 3d animation</h2>
			</aside>
		</div>
	);
}

export default MainPage;
