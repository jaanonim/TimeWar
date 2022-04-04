import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import styles from "./MainPage.module.css";

function MainPage() {
	return (
		<div className={styles.container}>
			<nav className={styles.nav}>
				<h1 className={styles.logo}>TimeWar</h1>
				<ul className={styles.navList}>
					<li className={styles.navItem}>
						<Link className={styles.link} to="/game">
							<Button>Game</Button>
						</Link>
					</li>
					<li className={styles.navItem}>
						<Link className={styles.link} to="/settings">
							<Button>Settings</Button>
						</Link>
					</li>
					<li className={styles.navItem}>
						<Link className={styles.link} to="/aboute">
							<Button>Aboute</Button>
						</Link>
					</li>
				</ul>
				<footer className={styles.footer}>
					jaanonim &amp; n2one &copy; 2021
				</footer>
			</nav>
			<aside className={styles.aside}>
				<h2>TODO: Some 3d animation</h2>
			</aside>
		</div>
	);
}

export default MainPage;
