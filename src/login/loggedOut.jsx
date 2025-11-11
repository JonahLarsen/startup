import { useState } from "react";
import React from "react";


export function LoggedOut(props) {
    const [userEmail, setUserEmail] = useState(props.userEmail);
    const [password, setPassword] = useState(props.password);

    async function login() {
        localStorage.setItem("userEmail", userEmail);
        props.onLogin();
    }

    async function register() {
        localStorage.setItem("userEmail", userEmail);
        props.onLogin();
    }

    return (
        <form>
            <div>
                <span>Enter your Email</span>
                <br/>
                <input type="text" placeholder="your@email.com" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
            </div>
            <div>
                <span>Enter your Password</span>
                <br/>
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" onClick={() => login()} disabled={!userEmail || !password}>Login</button>
            <button type="submit" onClick={() => register()} disabled={!userEmail || !password}>Register</button>
        </form>
    )
}