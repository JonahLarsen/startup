import { useState } from "react";
import React from "react";


export function LoggedOut(props) {
    const [userEmail, setUserEmail] = useState(props.userEmail);
    const [password, setPassword] = useState("");

    async function login() {
        loginOrRegister(`/api/auth/login`);
    }

    async function register() {
        loginOrRegister(`api/auth/create`);
    }

    async function loginOrRegister(endpoint) {
        const response = await fetch(endpoint, {
            method: "post",
            body: JSON.stringify({email: userEmail, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }, 
        }
        );
        if (response?.status === 200) {
            localStorage.setItem("userEmail", userEmail);
            props.onLogin();
        } else {
            const body = await response.json();
            alert(`Error: ${body.msg}`);
        }
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