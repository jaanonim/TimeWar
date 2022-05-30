import React, { useState } from "react";
import styles from "./AddBuildingPage.module.css";
import CheckboxBoard from "../../components/CheckboxBoard";
import { SupplyTypes } from "../../scripts/enums/SupplyTypes";
import { fetchToServer } from "../../scripts/utilities/fetchToServer";


function AddBuildingPage() {
  const [status, setStatus] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [maxLives, setMaxLives] = useState(4);
  const [model, setModel] = useState("");
  const [increaseSupplyType, setIncreaseSupplyType] = useState("");
  const [increaseSupply, setIncreaseSupply] = useState("");
  const [scale, setScale] = useState(2);
  const [price, setPrice] = useState(3);
  const [display, setDisplay] = useState(true);
  const [capturingMask, setCapturingMask] = useState({ width: 4, height: 4 });
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [offsetZ, setOffsetZ] = useState(0);

  const send = async () => {
    let data = {
      name,
      image,
      description,
      maxLives,
      model,
      scale,
      price,
      display,
      increaseSupplyType,
      increaseSupply,
      capturingMask: capturingMask.board,
      offset: [offsetX, offsetY, offsetZ],
    };

    let response = await fetchToServer("admin/addBuilding", {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    if (response.status === 200) {
      setStatus(await response.text());
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
          Name{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Image{" "}
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label>
          Description{" "}
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Max Lives{" "}
          <input
            type="number"
            value={maxLives}
            onChange={(e) => setMaxLives(e.target.value)}
          />
        </label>
        <label>
          Model{" "}
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </label>
        <label>
          Display{" "}
          <input
            type="checkbox"
            checked={display}
            onChange={(e) => setDisplay(e.target.checked)}
          />
        </label>
        <label>
          Scale{" "}
          <input
            type="number"
            value={scale}
            onChange={(e) => setScale(e.target.value)}
            step="0.01"
          />
        </label>
        <label>
          Price{" "}
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          IncreaseSupplyType{" "}
          <select onChange={(e) => setIncreaseSupplyType(e.target.value)}>
            {Object.keys(SupplyTypes).map((key) => (
              <option
                value={SupplyTypes[key]}
                selected={increaseSupplyType === SupplyTypes[key]}
              >
                {key}
              </option>
            ))}
          </select>
        </label>
        <label>
          Increase Supply{" "}
          <input
            type="number"
            value={increaseSupply}
            onChange={(e) => setIncreaseSupply(e.target.value)}
          />
        </label>
        <CheckboxBoard
          infoText="Capturing Mask"
          value={capturingMask}
          onChange={setCapturingMask}
        />
        <div>
          Offset
          <input
            type="number"
            step={0.01}
            value={offsetX}
            onChange={(e) => setOffsetX(e.target.value)}
          />
          <input
            type="number"
            step={0.01}
            value={offsetY}
            onChange={(e) => setOffsetY(e.target.value)}
          />
          <input
            type="number"
            step={0.01}
            value={offsetZ}
            onChange={(e) => setOffsetZ(e.target.value)}
          />
        </div>
        <input type="button" onClick={send} value="create" />
      </form>
    </>
  );
}

export default AddBuildingPage;
