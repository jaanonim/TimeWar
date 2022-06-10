import { useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { UiHandlers } from "../../scripts/managers/UiHandlers";

function IdleScreen() {
    const [show, setShow] = useState(false);
    UiHandlers.instance.setIdleScreen = setShow;

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
                    You have been idle for too long.
                </div>
                <div
                    style={{
                        textAlign: "center",
                        margin: "1rem",
                        fontSize: "1.5rem",
                    }}
                >
                    You will be kicked if you don't reconnect.
                </div>
                <div style={{ margin: "2rem auto", width: "50%" }}>
                    <Button
                        onClick={() => {
                            window.location.reload();
                        }}
                    >
                        <div style={{ padding: "0.2rem", textAlign: "center" }}>
                            Reconnect
                        </div>
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
export default IdleScreen;
