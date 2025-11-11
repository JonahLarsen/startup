import React from "react";
import "./login.css"
import { LoggedIn } from "./loggedIn";
import { LoggedOut } from "./loggedOut";

export function Login({userEmail, authState, changeAuthState}) {
    return (
        <main>
            {authState ? <h2>Welcome {userEmail}</h2> : <h2>Login</h2>}
            {authState && <LoggedIn userEmail={userEmail} onLogout={() => changeAuthState(false)} />}
            {!authState && <LoggedOut userEmail={userEmail} onLogin={() => changeAuthState(true)} />} 
        </main>
    )
}