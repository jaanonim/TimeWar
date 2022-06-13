import { Link } from "react-router-dom";
import AsideAnimation from "../../../components/AsideAnimation";
import Button from "../../../components/Button";
import styles from "./AdminPage.module.css";

function AdminPage() {
    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <h1 className={styles.logo}>TimeWar</h1>
                <h2 style={{ textAlign: "center", margin: 0, padding: 0 }}>
                    Admin
                </h2>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link className={styles.link} to="/addArmy">
                            <Button>
                                <div className={styles.box}>Add Army</div>
                            </Button>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link className={styles.link} to="/addBuilding">
                            <Button>
                                <div className={styles.box}>Add Building</div>
                            </Button>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link
                            className={styles.link}
                            to="/changeDefaultSettings"
                        >
                            <Button>
                                <div className={styles.box}>
                                    Change Default Settings
                                </div>
                            </Button>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link className={styles.link} to="/mapCreator">
                            <Button>
                                <div className={styles.box}>Map Creator</div>
                            </Button>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link className={styles.link} to="/login">
                            <Button>
                                <div className={styles.box}>Login</div>
                            </Button>
                        </Link>
                    </li>
                </ul>
                <footer className={styles.footer}>
                    jaanonim &amp; n2one &copy; 2022
                </footer>
            </nav>
            <aside className={styles.aside}>
                <AsideAnimation />
            </aside>
        </div>
    );
}

export default AdminPage;
