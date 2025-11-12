import React, { useState, useEffect } from "react";
import { StartGame } from "./startGame";

export function Play(props) {
    const [chatGPTMessage, setChatGPTMessage] = useState("")
    const [gameList, setGameList] = useState([]);
    const [currentGame, setCurrentGame] = useState(null);
    const [gameIDCounter, setGameIDCounter] = useState(1);

    function createGame(newGame) {
        const newGameList = [...gameList, newGame];
        localStorage.setItem("games", JSON.stringify(newGameList));
        setGameList(newGameList);
        setGameIDCounter(pastCounter => pastCounter + 1)
    }

    useEffect(() => {
        const gamesText = localStorage.getItem("games");
        if (gamesText) {
            setGameList(JSON.parse(gamesText));
        }
    }, []);

    useEffect(() => {
        setCurrentGame(gameList[0]);
    }, [gameList]);

    const gameRows = []
    if (gameList.length) {
        for (const [i, game] of gameList.entries()) {
            gameRows.push(
                <option value={game.id}>{game.id}: {game.opponentName}</option>
            )
        }
    }

    function askChatGPT() {
        setChatGPTMessage("The best move based on your current situation would be...")
    }

    console.log(gameList);
    console.log(currentGame)
    return (
        <main>
            <h2>Game</h2>
            <p>Logged in as {props.userEmail}</p>
            <>
                
            </>
            {currentGame &&
                <>
                    <h3>ID: {currentGame.id} |  Opponent: {currentGame.opponentName}</h3>
                    <form>
                        <label htmlFor="gamechoice">Choose game:</label>
                        <select className="gamechoice" id="gamechoice" onChange={() => setCurrentGame(gameList[value])}>
                            {gameRows}
                        </select>
                    </form>
                    <img src="../img/placeholder_game.png" alt="Placeholder image for Tic Tac Toe game" />
                    {currentGame.turn === props.userEmail && 
                        <p>Your turn...</p>
                    }
                    {currentGame.turn !== props.userEmail &&
                        <p>{props.userEmail}'s turn...</p>
                    }
                    <br />
                    <br />    
                    <p>Need help? Ask ChatGPT for the best next move!</p>
                    <button onClick={askChatGPT}>Ask ChatGPT</button>
                    <p>{chatGPTMessage}</p>
                </>
            }
            <div>
                <h3>Start a Game!</h3>
                <StartGame createGame={createGame} gameIDCounter={gameIDCounter} userEmail={props.userEmail} />
            </div>


        </main>
    )
}