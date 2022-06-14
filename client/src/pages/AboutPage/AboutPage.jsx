import { Link } from "react-router-dom";
import AsideAnimation from "../../components/AsideAnimation";
import Button from "../../components/Button";
import styles from "./AboutPage.module.css";

function AboutPage() {
    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <h1 className={styles.logo}>TimeWar</h1>
                <div className={styles.cbox}>
                    <p>
                        This game was created as school project. It's made with
                        Three.js and React.js and use Express.js sever with
                        MongoDb.
                    </p>
                    <p>Authors:</p>
                    <ul>
                        <li>
                            <a
                                href="https://github.com/n2oneProgrammer"
                                target="_blank"
                            >
                                n2one
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://github.com/jaanonim"
                                target="_blank"
                            >
                                jaanonim
                            </a>
                        </li>
                    </ul>
                    <p>
                        It's open source.
                        <br />
                        <a
                            href="https://github.com/jaanonim/TimeWar"
                            target="_blank"
                        >
                            https://github.com/jaanonim/TimeWar
                        </a>
                    </p>
                    <Link className={styles.link} to="/">
                        <Button>
                            <div className={styles.box}>Back</div>
                        </Button>
                    </Link>
                </div>
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
export default AboutPage;
