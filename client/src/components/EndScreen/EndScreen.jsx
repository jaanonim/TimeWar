import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import Button from "../Button";

function EndScreen() {
  const [show, setShow] = useState(false);
  const isWin = true;
  //TODO: add hook here

  return (
    <div style={{ zIndex: "10000", pointerEvents: "all" }}>
      <Modal show={show}>
        <div style={{ textAlign: "center", fontSize: "3rem" }}>
          {isWin ? "You win! 🎉" : "You loos! 😥"}
        </div>
        <Link
          to="/join"
          style={{
            margin: "3rem auto 1rem auto",
            width: "50%",
            textDecoration: "none",
            display: "block",
          }}
        >
          <Button>
            <div style={{ padding: "0.5rem", textAlign: "center" }}>
              Back to menu
            </div>
          </Button>
        </Link>
      </Modal>
    </div>
  );
}
export default EndScreen;
