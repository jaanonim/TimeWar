import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AsideAnimation from "../../components/AsideAnimation";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import useToast from "../../hooks/useToast";
import { getRandomString } from "../../scripts/utilities/Random";
import styles from "./JoinPage.module.css";

function JoinPage() {
    const [nick, setNick] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [join, setJoin] = useState(false);
    const toast = useToast();
    let navigate = useNavigate();

    const joinBtn = useRef(null);
    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <h1 className={styles.logo}>TimeWar</h1>
                <div className={styles.cbox}>
                    <div className={styles.link}>
                        <Input
                            w="calc(100% - 3rem)"
                            autoFocus={true}
                            placeholder="Enter your nick"
                            value={nick}
                            onInput={(event) => {
                                sessionStorage.setItem(
                                    "nick",
                                    event.target.value
                                );
                                setNick(event.target.value);
                            }}
                        />
                    </div>

                    <div className={styles.flex}>
                        <div className={styles.link}>
                            <Button
                                onClick={() => {
                                    let code = getRandomString(6);
                                    navigate("/game?room=" + code);
                                }}
                            >
                                <div className={styles.box}>Create room</div>
                            </Button>
                        </div>
                        <div className={styles.link}>
                            <Button
                                onClick={() => {
                                    setJoin(true);
                                }}
                            >
                                <div className={styles.box}>Join room</div>
                            </Button>
                        </div>
                    </div>

                    <Modal
                        backgroundClick={() => {
                            setJoin(false);
                        }}
                        show={join}
                    >
                        <div className={styles.modal}>
                            <Input
                                w="calc(6rem+ 3rem)"
                                autoFocus={true}
                                placeholder="Enter code"
                                maxLength={6}
                                textAlign="center"
                                textTransform="uppercase"
                                onInput={(event) => {
                                    setRoomCode(
                                        event.target.value.toUpperCase()
                                    );
                                }}
                                onEnter={() => {
                                    joinBtn.current.click();
                                }}
                            />
                            <div style={{ marginTop: "1.5rem" }}>
                                <Button
                                    ref={joinBtn}
                                    onClick={() => {
                                        if (roomCode.length === 6) {
                                            navigate("/game?room=" + roomCode);
                                        } else {
                                            toast({
                                                message: "Invalid code",
                                                type: "error",
                                            });
                                        }
                                    }}
                                >
                                    <div className={styles.box2}>Join</div>
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </div>
                <footer className={styles.footer}>
                    jaanonim &amp; n2one &copy; 2022
                </footer>
            </nav>
            <aside className={styles.aside}>
                <AsideAnimation />
            </aside>
        </div>
    );
}

export default JoinPage;
