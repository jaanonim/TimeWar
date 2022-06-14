import { useEffect, useState } from "react";
import GameScreen from "../../components/GameScreen";
import Input from "../../components/Input";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import UiOverlay from "../../components/UiOverlay";
import useToast from "../../hooks/useToast";
import GameManager from "../../scripts/GameManager";
import { UiHandlers } from "../../scripts/managers/UiHandlers";
import styles from "./GamePage.module.css";

function GamePage() {
    const toast = useToast();
    const [infoPanelEnable, setInfoPanelEnable] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    UiHandlers.instance.setInfoRoomPanel = setInfoPanelEnable;
    UiHandlers.instance.setIsLoading = setIsLoading;
    UiHandlers.instance.sendToast = toast;
    useEffect(() => {
        return () => {
            console.log("GameManager unmount");
            GameManager.instance.destroy();
        };
    }, []);

    const queryParams = new URLSearchParams(window.location.search);
    let roomCode = queryParams.get("room");
    return (
        <>
            <UiOverlay />
            <GameScreen roomCode={roomCode} />
            <Modal show={infoPanelEnable} backgroundColor="var(--background)">
                <div className={styles.modal} style={{ textAlign: "center" }}>
                    <h2
                        style={{
                            marginTop: "0",
                        }}
                    >
                        Room code is:
                    </h2>
                    <Input
                        w="calc(6rem+ 3rem)"
                        autoFocus={true}
                        placeholder="Enter code"
                        maxLength={6}
                        textAlign="center"
                        textTransform="uppercase"
                        readonly={true}
                        value={roomCode}
                        onClick={(e) => {
                            try {
                                navigator.clipboard.writeText(e.target.value);
                                toast({
                                    message: `Copied to clipboard`,
                                    dismissTime: 1000,
                                });
                            } catch (e) {}
                        }}
                    />
                    <p>Waiting for opponent to join room...</p>
                </div>
            </Modal>
            {isLoading ? <Loading /> : null}
        </>
    );
}

export default GamePage;
