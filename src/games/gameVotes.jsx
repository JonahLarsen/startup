import { useEffect, useState } from "react";
import React from "react";
import { websocketClient } from "./websocketClient";

export function GameVotes() {
    const [tallies, setTallies] = useState({
                                            TopLeft: 0,
                                            TopMiddle: 0,
                                            TopRight: 0,
                                            MiddleLeft: 0,
                                            MiddleMiddle: 0,
                                            MiddleRight: 0,
                                            BottomLeft: 0,
                                            BottomMiddle: 0,
                                            BottomRight: 0
                                        });
    const [webSocketService, setWebSocketService] = useState(null);

    useEffect(() => {  
        const webSocket = new websocketClient(setTallies)
        setWebSocketService(webSocket);

        return () => {
            webSocket.socket.close();
        }
    }, [])


    function sendVote() {
        const selectedValue = document.getElementById('startSpot').value;
        webSocketService.sendVote(selectedValue);
    }
    
    return (
        <div>
            <h3>Vote on the best starting spot</h3>
            <select name="spot" id="startSpot">
                <option value="TopLeft">Top Left</option>
                <option value="TopMiddle">Top Middle</option>
                <option value="TopRight">Top Right</option>
                <option value="MiddleLeft">Middle Left</option>
                <option value="MiddleMiddle">Middle Middle</option>
                <option value="MiddleRight">Middle Right</option>
                <option value="BottomLeft">Bottom Left</option>
                <option value="BottomMiddle">Bottom Middle</option>
                <option value="BottomRight">Bottom Right</option>
            </select>
            <button onClick={sendVote}>Send Vote</button><br />
            <br />
            <table>
                <thead>
                    <tr>
                        <td>Spot</td>
                        <td>Votes</td>
                    </tr>   
                </thead>
                <tbody>
                    <tr>
                        <td>Top Left</td>
                        <td>{tallies.TopLeft}</td>
                    </tr>
                    <tr>
                        <td>Top Middle</td>
                        <td>{tallies.TopMiddle}</td>
                    </tr>
                    <tr>
                        <td>Top Right</td>
                        <td>{tallies.TopRight}</td>
                    </tr>
                    <tr>
                        <td>Middle Left</td>
                        <td>{tallies.MiddleLeft}</td>
                    </tr>
                    <tr>
                        <td>Middle Middle</td>
                        <td>{tallies.MiddleMiddle}</td>
                    </tr>
                    <tr>
                        <td>Middle Right</td>
                        <td>{tallies.MiddleRight}</td>
                    </tr>
                    <tr>
                        <td>Bottom Left</td>
                        <td>{tallies.BottomLeft}</td>
                    </tr>
                    <tr>
                        <td>Bottom Middle</td>
                        <td>{tallies.BottomMiddle}</td>
                    </tr>
                    <tr>
                        <td>Bottom Right</td>
                        <td>{tallies.BottomRight}</td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}