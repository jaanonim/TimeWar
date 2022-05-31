import React, { useState } from "react";
import styles from "./MapCreatorPage.module.css";
import { fetchToServer } from "../../scripts/utilities/fetchToServer";
import SelectBoard from "../../components/SelectBoard";
import { MapLandTypes } from "../../scripts/enums/MapTileTypes";

function MapCreatorPage() {
  const [status, setStatus] = useState(null);
  const [map, setMap] = useState({ width: 4, height: 4 });
  const [researchLab, setResearchLab] = useState({ width: 4, height: 4 });

  const options = Object.keys(MapLandTypes).map((key) => {
    return {
      name: key,
      value: MapLandTypes[key],
    };
  });

  const setOnlyOneResearchLab = (data) => {
    let board = data.board;
    let isRed = false,
      isBlue = false;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "RED") {
          if (isRed) {
            board[i][j] = 0;
          }
          isRed = true;
        }
        if (board[i][j] === "BLUE") {
          if (isBlue) {
            board[i][j] = 0;
          }
          isBlue = true;
        }
      }
    }

    setResearchLab(Object.assign(data, { board: board }));
  };

  const send = async () => {
    let board = researchLab.board;
    let redPos = {},
      bluePos = {};

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "RED") {
          redPos = { x: i, y: j };
        }
        if (board[i][j] === "BLUE") {
          bluePos = { x: i, y: j };
        }
      }
    }

    let data = {
      map: map,
      blueResearchLab: bluePos,
      redResearchLab: redPos,
    };
    let response = await fetchToServer("admin/addMap", {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    if (response.status === 200) {
      setStatus("CREATED");
    } else {
      let data = await response.text();
      setStatus("ERROR: " + data);
    }
  };

  return (
    <>
      <p>{status}</p>
      <form>
        <p>BLUE</p>
        <SelectBoard
          infoText="MAP"
          options={options}
          value={map}
          onChange={setMap}
        />
        <p>RED</p>
        <p>BLUE</p>
        <SelectBoard
          infoText="RESEARCH LABS"
          options={[
            { name: "none", value: 0 },
            { name: "RED", value: "RED" },
            {
              name: "BLUE",
              value: "BLUE",
            },
          ]}
          value={researchLab}
          onChange={setOnlyOneResearchLab}
        />
        <p>RED</p>
        <input type="button" onClick={send} value="create" />
      </form>
    </>
  );
}

export default MapCreatorPage;
