import React from "react";
import "./login.css"

export function Login() {
    return (
        <main>
            <h2>Login</h2>
            <form>
                <div>
                    <span>Enter your Email</span>
                    <br/>
                    <input type="text" placeholder="your@email.com" />
                </div>
                <div>
                    <span>Enter your Password</span>
                    <br/>
                    <input type="password" placeholder="password" />
                </div>
                <button type="submit">Login</button>
                <button type="submit">Register</button>
            </form> 
        </main>
    )
}