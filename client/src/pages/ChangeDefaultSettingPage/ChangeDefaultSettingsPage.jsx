import React, { useEffect, useState } from "react";
import styles from "./ChangeDefaultSettingsPage.module.css";
import { fetchToServer } from "../../scripts/utilities/fetchToServer";

function ChangeDefaultSettingsPage() {
  const [status, setStatus] = useState(null);
  const [playerTarget, setPlayerTarget] = useState(10);
  const [labId, setLabId] = useState("");
  const [airArmySupply, setAirArmySupply] = useState(0);
  const [landArmySupply, setLandArmySupply] = useState(0);
  const [buildingsSupply, setBuildingSupply] = useState(0);
  useEffect(async () => {
    let response = await fetchToServer("admin/getDefaultSetting", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    let json = await response.json();
    setPlayerTarget(json["playerTarget"]);
    setLabId(json["labId"]);
    setLandArmySupply(json["supply"]["air_army"]);
    setAirArmySupply(json["supply"]["land_army"]);
    setBuildingSupply(json["supply"]["building"]);
  });
  const send = async () => {
    let data = {
      playerTarget: playerTarget,
      labId: labId,
      supply: {
        air_army: airArmySupply,
        land_army: landArmySupply,
        building: buildingsSupply,
      },
    };
    let response = await fetchToServer("admin/changeDefaultSetting", {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    if (response.status === 200) {
      setStatus("DODANY");
    } else {
      let data = await response.text();
      setStatus("COŚ POSZŁO NIE TAK: " + data);
    }
  };

  return (
    <>
      <p>{status}</p>
      <form>
        <label>
          Player Target
          <input
            type="number"
            value={playerTarget}
            onChange={(e) => setPlayerTarget(e.target.value)}
          />
        </label>
        <label>
          Lab Id
          <input
            type="text"
            value={labId}
            onChange={(e) => setLabId(e.target.value)}
          />
        </label>
        <label>
          Supply Land Army
          <input
            type="number"
            value={landArmySupply}
            onChange={(e) => setLandArmySupply(e.target.value)}
          />
        </label>
        <label>
          Supply Air Army
          <input
            type="number"
            value={airArmySupply}
            onChange={(e) => setAirArmySupply(e.target.value)}
          />
        </label>
        <label>
          Supply Buildings
          <input
            type="number"
            value={buildingsSupply}
            onChange={(e) => setBuildingSupply(e.target.value)}
          />
        </label>
        <input type="button" onClick={send} value="create" />
      </form>
    </>
  );
}

export default ChangeDefaultSettingsPage;
