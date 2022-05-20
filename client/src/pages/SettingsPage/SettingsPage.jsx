import { Link } from "react-router-dom";
import Button from "../../components/Button";
import SettingsCheckbox from "../../components/SettingsCheckbox";
import Slider from "../../components/Slider";
import useToast from "../../hooks/useToast";
import styles from "./SettingsPage.module.css";

function SettingsPage() {
  const toast = useToast();

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <h1 className={styles.logo}>TimeWar</h1>
        <div className={styles.cbox}>
          <Slider />
          <SettingsCheckbox
            name="renderer.antialias"
            text="Antialias"
          ></SettingsCheckbox>
          <SettingsCheckbox
            name="renderer.shadowMap.enabled"
            text="Shadows"
          ></SettingsCheckbox>
          <div
            className={styles.resetSettings}
            onClick={() => {
              toast({ message: "Settings reseted" });
            }}
          >
            Reset settings
          </div>
          <Link className={styles.link} to="/">
            <Button
              onClick={() => {
                toast({ message: "Settings saved" });
              }}
            >
              <div className={styles.box}>Save</div>
            </Button>
          </Link>
        </div>
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
export default SettingsPage;
