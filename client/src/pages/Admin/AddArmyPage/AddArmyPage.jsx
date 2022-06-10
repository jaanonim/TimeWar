import { useState } from "react";
import styles from "./AddArmyPage.module.css";
import CheckboxBoard from "../../../components/CheckboxBoard";
import { fetchToServer } from "../../../scripts/utilities/fetchToServer";

function AddArmyPage() {
    const [status, setStatus] = useState(null);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [maxLives, setMaxLives] = useState(4);
    const [damage, setDamage] = useState(3);
    const [isFlyable, setIsFlyable] = useState(false);
    const [model, setModel] = useState("");
    const [scale, setScale] = useState(2);
    const [price, setPrice] = useState(3);
    const [moveMask, setMoveMask] = useState({ width: 4, height: 4 });
    const [attackMask, setAttackMask] = useState({ width: 4, height: 4 });

    const send = async () => {
        let data = {
            name,
            image,
            description,
            maxLives,
            damage,
            isFlyable,
            model,
            scale,
            price,
            moveMask: moveMask.board,
            attackMask: attackMask.board,
        };

        let response = await fetchToServer("admin/addArmy", {
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
            setStatus("ERROR: " + data);
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
                    Max lives{" "}
                    <input
                        type="number"
                        value={maxLives}
                        onChange={(e) => setMaxLives(e.target.value)}
                    />
                </label>
                <label>
                    Damage{" "}
                    <input
                        type="number"
                        value={damage}
                        onChange={(e) => setDamage(e.target.value)}
                    />
                </label>
                <label>
                    IsFlyable{" "}
                    <input
                        type="checkbox"
                        checked={isFlyable}
                        onChange={(e) => setIsFlyable(e.target.checked)}
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
                <CheckboxBoard
                    infoText="Move Mask"
                    value={moveMask}
                    onChange={setMoveMask}
                />
                <CheckboxBoard
                    infoText="Attack Mask"
                    value={attackMask}
                    onChange={setAttackMask}
                />
                <input type="button" onClick={send} value="create" />
            </form>
        </>
    );
}

export default AddArmyPage;
