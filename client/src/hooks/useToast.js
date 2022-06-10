import { useContext } from "react";
import { ToastContext } from "../components/ToastContext/ToastContext";

const useToast = () => {
    const [t, st] = useContext(ToastContext);
    return ({ message, dismissTime = 3000, type = "info" }) => {
        st([
            ...t.current,
            {
                message,
                dismissTime,
                type,
            },
        ]);
    };
};

export default useToast;
