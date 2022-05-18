import React from "react";
import GameScreen from "../../components/GameScreen";
import UiOverlay from "../../components/UiOverlay";
import useToast from "../../hooks/useToast";
import styles from "./GamePage.module.css";
import Modal from "../../components/Modal";
import Input from "../../components/Input";

function GamePage() {
    const toast = useToast();

    const queryParams = new URLSearchParams(window.location.search);
    let roomCode = queryParams.get("room");
    return (
        <>
            <UiOverlay/>
            <GameScreen/>
            <Modal>
                <div className={styles.modal} style={{textAlign: "center"}}>
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
                            navigator.clipboard.writeText(e.target.value);
                            toast({message: `Copied to clipboard`, dismissTime: 1000});
                        }}
                    />
                    <p>Waiting for opponent to join room...</p>
                </div>
            </Modal>
        </>
    );
}

export default GamePage;
