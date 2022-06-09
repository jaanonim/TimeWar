import React, { useState } from "react";
import Modal from "../../components/Modal";
import { UiHandlers } from "../../scripts/managers/UiHandlers";

function DisconnectTimer() {
    const [show, setShow] = useState(false);
    const [time, setTime] = useState(0);
    const [nick, setNick] = useState("");
    UiHandlers.instance.setDisconnectTimer = (time, nick) => {
        setTime(time);
        setNick(nick);
        setShow(true);
    };
    UiHandlers.instance.unsetDisconnectTimer = () => {
        setShow(false);
    };

    return (
        <div style={{ zIndex: "10000", pointerEvents: "all" }}>
            <Modal show={show}>
                <div
                    style={{
                        textAlign: "center",
                        margin: "1rem",
                        fontSize: "3rem",
                    }}
                >
                    Player {nick} has disconnected.
                </div>
                <div
                    style={{
                        textAlign: "center",
                        margin: "1rem",
                        fontSize: "1rem",
                    }}
                >
                    If he don't reconnect, you will win.
                </div>
                <div
                    style={{
                        margin: "1rem",
                        textAlign: "center",
                        fontSize: "3rem",
                        color: "var(--main)",
                    }}
                >
                    {time}
                </div>
            </Modal>
        </div>
    );
}
export default DisconnectTimer;
