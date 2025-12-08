import React, { useEffect, useState } from "react";
import "./games.css"
import { GameVotes } from "./gameVotes";
import { websocketClient } from "./websocketClient";

export function Games() {
    const [gameList, setGameList] = useState([]);
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);


    useEffect(() => {
        fetch("/api/games")
            .then((response) => response.json())
            .then((games) => {
                setGameList(games);
            })

        fetch("/api/wins")
            .then((response) => response.json())
            .then((wins) => {
                setWins(wins.wins);
            })

        fetch("/api/losses")
            .then((response) => response.json())
            .then((losses) => {
                setLosses(losses.losses);
            })
    }, []);

    const gameRows = []
    if (gameList.length) {
        for (const [i, game] of gameList.entries()) {
            gameRows.push(
                <tr key ={i}>
                    <td>{game.id}</td>
                    <td>{game.opponentName}</td>
                    <td>{game.turn}</td>
                </tr>
            )
        }
    } else {
        gameRows.push(
            <tr key="start">
                <td colSpan="3">Start a game to see info</td>
            </tr>
        )
    }

    return (
        <main>
            <h2>Games</h2>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Opponent</td>
                        <td>Turn</td>
                    </tr>
                </thead>
                <tbody>
                    {gameRows}
                </tbody>
            </table>
            <br/>
            <h2>Record</h2>
            <span>Wins: {wins}</span><br/>
            <span>Losses: {losses}</span><br/>
            <span>W/L Ratio: {losses ? wins / losses : wins}</span><br/>
            {wins > losses && 
                <div className="image_div"><img className="gameImg" src="img/positive_record.png" alt="Image of a green plus sign to indicate a strong W/L Ratio"/></div>
            }
            {wins < losses && 
                <div className="image_div"><img className="gameImg" src="img/negative_record.png" alt="Image of a red negative sign to indicated a weak W/L Ratio" /></div>
            }
            {wins === losses && 
                <div className="image_div"><img className="gameImg" src="img/equal_record.png" alt="Image of a yellow equals sign to indicated a equal amount of wins and losses" /></div>
            }
            <GameVotes webSocket={new websocketClient}/>
                
            
        </main>
    )
}