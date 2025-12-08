import { useState } from "react";
import React from "react";

export function GameVotes(props) {

    function sendVote() {
        props.webSocket
    }
    
    return (
        <div>
            <h3>Vote on the best starting spot</h3>
            <select name="spot" id="startSpot">
                <option value="Top-Left">Top Left</option>
                <option value="Top-Middle">Top Middle</option>
                <option value="Top-Right">Top Right</option>
                <option value="Middle-Left">Middle Left</option>
                <option value="Middle-Middle">Middle Middle</option>
                <option value="Middle-Right">Middle Right</option>
                <option value="Bottom-Left">Bottom Left</option>
                <option value="Bottom-Middle">Bottom Middle</option>
                <option value="Bottom-Right">Bottom Right</option>
            </select>
            <button onClick={sendVote}>Send Vote</button>
        </div>
    )
}