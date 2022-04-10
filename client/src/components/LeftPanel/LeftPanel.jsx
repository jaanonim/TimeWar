import {useState} from "react";
import {FigureTypes} from "../../scripts/enums/FigureTypes";
import GameManager from "../../scripts/GameManager";
import FiguresPlaceSection from "../FiguresPlaceSection";
import styles from "./LeftPanel.module.css";

function LeftPanel() {
    const [selectedFigureId, setSelectedFigureId] = useState(null);
    const [selectedFigureType, setSelectedFigureType] = useState(null);
    const [figures, setFigures] = useState(null);

    let landArmy = figures ? figures.landArmy : [];
    let airArmy = figures ? figures.airArmy : [];
    let buildings = figures ? figures.buildings : [];
    GameManager.instance.onSelectFigureInUI(
        selectedFigureId,
        selectedFigureType
    );
    GameManager.instance.setFiguresOnMenu = setFigures;
    return (
        <div className={`${styles.ui} ${styles.placementPanel}`}>
            <FiguresPlaceSection
                name="Land Army"
                figures={landArmy}
                select={
                    selectedFigureType === FigureTypes.ARMY
                        ? selectedFigureId
                        : -1
                }
                selecting={(newId) => {
                    setSelectedFigureId(newId);
                    setSelectedFigureType(FigureTypes.ARMY);
                }}
                value={2}
                max={3}
            />
        </div>
    );
}

export default LeftPanel;
