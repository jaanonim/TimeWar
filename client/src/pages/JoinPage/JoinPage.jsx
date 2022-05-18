import React, {useRef, useState} from "react";
import {Link} from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import {useNavigate} from "react-router-dom";
import styles from "./JoinPage.module.css";
import {getRandomString} from "../../scripts/utilities/Random";

function JoinPage() {
    const [nick, setNick] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [join, setJoin] = useState(false);
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
                            onInput={event => {
                                localStorage.setItem("nick", event.target.value);
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
                                onInput={event => {
                                    setRoomCode(event.target.value)
                                }}
                                onEnter={() => {
                                    joinBtn.current.click();
                                }}
                            />
                            <Link ref={joinBtn} className={styles.link} to={"/game?room=" + roomCode}>
                                <Button>
                                    <div className={styles.box2}>Join</div>
                                </Button>
                            </Link>
                        </div>
                    </Modal>
                </div>
                <footer className={styles.footer}>
                    jaanonim &amp; n2one &copy; 2021
                </footer>
            </nav>
            <aside className={styles.aside}>
                <h2>TODO: Some 3d animation</h2>
            </aside>
        </div>
    );
}

export default JoinPage;
