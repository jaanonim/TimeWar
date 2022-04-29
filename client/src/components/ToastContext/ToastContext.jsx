import React from "react";
import Toast from "./Toast";

export const ToastContext = React.createContext();

export function ToastContextProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);
  const tRef = React.useRef(toasts);
  React.useEffect(() => {
    tRef.current = toasts;
  }, [toasts]);

  return (
    <>
      <ToastContext.Provider value={[tRef, setToasts]}>
        {children}
        <div
          style={{
            position: "fixed",
            bottom: "0",
            left: "0",
            zIndex: "1000",
            width: "100vw",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              margin: "auto",
              width: "20vw",
              textAlign: "center",
            }}
          >
            {toasts.map((toast, i) => (
              <Toast key={i} toast={toast} />
            ))}
          </div>
        </div>
      </ToastContext.Provider>
    </>
  );
}
