import DisconnectTimer from "../DisconnectTimer";
import EndScreen from "../EndScreen";
import LeftPanel from "../LeftPanel";
import MasterBar from "../MasterBar";
import NextTurn from "../NextTurn";
import TopInfo from "../TopInfo";
import styles from "./UiOverlay.module.css";

function UiOverlay() {
    return (
        <main className={styles.main + " noselect"}>
            <LeftPanel />
            <NextTurn />
            <MasterBar />
            <TopInfo />
            <DisconnectTimer />
            <EndScreen />
        </main>
    );
}
export default UiOverlay;
