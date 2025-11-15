import { useNavigate } from "react-router-dom";
import React from "react";


export function LoggedIn (props) {
    const navigate = useNavigate();

    function logout() {
        fetch(`/api/auth/logout`, {
            method: 'delete',
        }).catch(() => {
            //Logout failed
        }).finally(() => {
            localStorage.removeItem("userEmail");
            props.onLogout();
        })
    }

    return (
        <div>
            <div>{props.userEmail}</div>
            <button onClick={() => navigate("/play")}>Start Playing</button>
            <button onClick={logout}>Logout</button>
        </div>
    )
}