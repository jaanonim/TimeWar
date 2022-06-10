import { Link } from "react-router-dom";
import AsideAnimation from "../../components/AsideAnimation";
import Button from "../../components/Button";
import styles from "./MainPage.module.css";

function MainPage() {
    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <h1 className={styles.logo}>TimeWar</h1>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link className={styles.link} to="/join">
                            <Button>
                                <div className={styles.box}>Game</div>
                            </Button>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link className={styles.link} to="/settings">
                            <Button>
                                <div className={styles.box}>Settings</div>
                            </Button>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link className={styles.link} to="/about">
                            <Button>
                                <div className={styles.box}>About</div>
                            </Button>
                        </Link>
                    </li>
                </ul>
                <footer className={styles.footer}>
                    jaanonim &amp; n2one &copy; 2021 - 2022
                </footer>
            </nav>
            <aside className={styles.aside}>
                <AsideAnimation />
            </aside>
        </div>
    );
}

export default MainPage;
