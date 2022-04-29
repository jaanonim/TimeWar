import { useContext } from "react";
import { ToastContext } from "../components/ToastContext/ToastContext";

const useToast = () => {
    const [t, st] = useContext(ToastContext);
    return ({ message, dismissTime = 3000 }) => {
        st([
            ...t.current,
            {
                message,
                dismissTime,
            },
        ]);
    };
};

export default useToast;
