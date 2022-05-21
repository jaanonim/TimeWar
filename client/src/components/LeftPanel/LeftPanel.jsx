import { useState } from "react";
import { FigureTypes } from "../../scripts/enums/FigureTypes";
import { SupplyTypes } from "../../scripts/enums/SupplyTypes";
import { UiHandlers } from "../../scripts/managers/UiHandlers";
import FiguresPlaceSection from "../FiguresPlaceSection";
import styles from "./LeftPanel.module.css";

function LeftPanel() {
  const [selectedFigureId, setSelectedFigureId] = useState(null);
  const [selectedFigureType, setSelectedFigureType] = useState(null);
  const [supplyLandArmy, setSupplyLandArmy] = useState({ value: 0, max: 10 });
  const [supplyBuildings, setSupplyBuildings] = useState({ value: 0, max: 10 });
  const [supplyAirArmy, setSupplyAirArmy] = useState({ value: 0, max: 10 });
  const [figures, setFigures] = useState(null);
  const [disabled, setDisabled] = useState(false);
  UiHandlers.instance.disableLeftButtoms = (v) => {
    setDisabled(v);
  };

  let landArmy = figures ? figures.landArmy : [];
  let airArmy = figures ? figures.airArmy : [];
  let buildings = figures ? figures.buildings : [];
  UiHandlers.instance.onSelectFigureInUI(selectedFigureId, selectedFigureType);
  UiHandlers.instance.setFiguresOnMenu = setFigures;
  UiHandlers.instance.setSupplyOnMenu = (supply) => {
    setSupplyLandArmy(supply[SupplyTypes.LAND_ARMY]);
    setSupplyBuildings(supply[SupplyTypes.BUILDING]);
    setSupplyAirArmy(supply[SupplyTypes.AIR_ARMY]);
  };
  return (
    <div className={`${styles.ui} ${styles.placementPanel}`}>
      <FiguresPlaceSection
        name="Land Army"
        figures={landArmy}
        select={selectedFigureType === FigureTypes.ARMY ? selectedFigureId : -1}
        selecting={(newId) => {
          setSelectedFigureId(newId);
          setSelectedFigureType(FigureTypes.ARMY);
        }}
        value={supplyLandArmy.value}
        max={supplyLandArmy.max}
        disabled={disabled}
      />

      <FiguresPlaceSection
        name="Buildings"
        figures={buildings}
        select={
          selectedFigureType === FigureTypes.BUILDING ? selectedFigureId : -1
        }
        selecting={(newId) => {
          setSelectedFigureId(newId);
          setSelectedFigureType(FigureTypes.BUILDING);
        }}
        value={supplyBuildings.value}
        max={supplyBuildings.max}
        disabled={disabled}
      />
      <FiguresPlaceSection
        name="Air Army"
        figures={airArmy}
        select={selectedFigureType === FigureTypes.ARMY ? selectedFigureId : -1}
        selecting={(newId) => {
          setSelectedFigureId(newId);
          setSelectedFigureType(FigureTypes.ARMY);
        }}
        value={supplyAirArmy.value}
        max={supplyAirArmy.max}
        disabled={disabled}
      />
    </div>
  );
}

export default LeftPanel;
