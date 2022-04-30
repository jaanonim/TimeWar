import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import useToast from "../../hooks/useToast";
import styles from "./JoinPage.module.css";

function JoinPage() {
  const [join, setJoin] = useState(false);
  const [create, setCreate] = useState(false);
  const toast = useToast();
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
            />
          </div>

          <div className={styles.flex}>
            <div className={styles.link}>
              <Button
                onClick={() => {
                  setCreate(true);
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
                onEnter={() => {
                  joinBtn.current.click();
                }}
              />
              <Link ref={joinBtn} className={styles.link} to="/game">
                <Button>
                  <div className={styles.box2}>Join</div>
                </Button>
              </Link>
            </div>
          </Modal>

          <Modal
            backgroundClick={() => {
              setCreate(false);
            }}
            show={create}
          >
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
                onEnter={() => {
                  joinBtn.current.click();
                }}
                readonly={true}
                value={"123456"}
                onClick={(e) => {
                  navigator.clipboard.writeText(e.target.value);
                  toast({ message: `Copied to clipboard`, dismissTime: 1000 });
                }}
              />
              <p>Waiting for opponent to join room...</p>
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
