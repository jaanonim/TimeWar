import React, { useState } from "react";
import { fetchToServer } from "../../../scripts/utilities/fetchToServer";

function AdminLoginPage() {
    const [status, setStatus] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const send = async () => {
        let response = await fetchToServer("admin/login", {
            method: "POST",
            body: JSON.stringify({
                login: login,
                password: password,
            }),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        });
        let text = await response.text();
        if (response.status === 200) {
            sessionStorage.setItem("authToken", text);
            setStatus("LOGGED");
        } else {
            setStatus(text);
        }
    };

    return (
        <>
            {status}
            <form>
                <input
                    type="text"
                    name="login"
                    placeholder="login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <input onClick={send} type="button" value="LOGIN" />
            </form>
        </>
    );
}

export default AdminLoginPage;
