import {useState} from "react";
import {FigureTypes} from "../../scripts/enums/FigureTypes";
import FiguresPlaceSection from "../FiguresPlaceSection";
import styles from "./LeftPanel.module.css";
import {UiHandlers} from "../../scripts/managers/UiHandlers";

function LeftPanel() {
    const [selectedFigureId, setSelectedFigureId] = useState(null);
    const [selectedFigureType, setSelectedFigureType] = useState(null);
    const [figures, setFigures] = useState(null);

    let landArmy = figures ? figures.landArmy : [];
    let airArmy = figures ? figures.airArmy : [];
    let buildings = figures ? figures.buildings : [];
    UiHandlers.instance.onSelectFigureInUI(
        selectedFigureId,
        selectedFigureType
    );
    UiHandlers.instance.setFiguresOnMenu = setFigures;
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

            <FiguresPlaceSection
                name="Buildings"
                figures={buildings}
                select={
                    selectedFigureType === FigureTypes.BUILDING
                        ? selectedFigureId
                        : -1
                }
                selecting={(newId) => {
                    setSelectedFigureId(newId);
                    setSelectedFigureType(FigureTypes.BUILDING);
                }}
                value={2}
                max={3}
            />

        </div>
    );
}

export default LeftPanel;
