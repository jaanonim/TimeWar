import { Link } from "react-router-dom";
import Button from "../../components/Button";
import SettingsCheckbox from "../../components/SettingsCheckbox";
import SettingsSlider from "../../components/SettingsSlider";
import useToast from "../../hooks/useToast";
import Settings from "../../scripts/utilities/Settings";
import styles from "./SettingsPage.module.css";

function SettingsPage() {
  const toast = useToast();

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <h1 className={styles.logo}>TimeWar</h1>
        <div className={styles.cbox}>
          <SettingsSlider
            name="camera.fov"
            text="Field of View"
            min={30}
            max={160}
            step={5}
          ></SettingsSlider>
          <SettingsSlider
            name="camera.movmentSpeed"
            text="Camera Movement Speed"
            min={1}
            max={30}
            step={1}
          ></SettingsSlider>
          <SettingsSlider
            name="camera.rotatmentSpeed"
            text="Camera Rotation Speed"
            min={0.1}
            max={2}
            step={0.1}
          ></SettingsSlider>
          <SettingsCheckbox
            name="renderer.antialias"
            text="Antialias"
          ></SettingsCheckbox>
          <SettingsCheckbox
            name="renderer.shadowMap.enabled"
            text="Shadows"
          ></SettingsCheckbox>
          <SettingsSlider
            name="renderer.pixelRatio"
            text="Resolutin Scale"
            min={0.1}
            max={2}
            step={0.1}
          ></SettingsSlider>
          <div
            className={styles.resetSettings}
            onClick={() => {
              Settings.instance.setDefaults();
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
        <AsideAnimation />
      </aside>
    </div>
  );
}
export default SettingsPage;
