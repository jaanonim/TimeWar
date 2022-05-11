import React, {useContext, useEffect} from "react";
import styles from "./Toast.module.css";
import {ToastContext} from "./ToastContext";

const Toast = (props) => {
    const [t, st] = useContext(ToastContext);

    useEffect(() => {
        const interval = setTimeout(() => {
            let toast = t.current.filter((t) => t !== props.toast);
            st(toast);
        }, props.toast.dismissTime);
        return () => {
            if (!t.current.some((t) => t === props.toast)) clearTimeout(interval);
        };
    }, []);

    return <div className={styles.box}>{props.toast.message}</div>;
};

export default Toast;
