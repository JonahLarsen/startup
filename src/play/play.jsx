import React, { useState, useEffect } from "react";
import { StartGame } from "./startGame";
import { TicTacToe } from "./TicTacToe";

export function Play(props) {
    const [chatGPTMessage, setChatGPTMessage] = useState("")
    const [gameList, setGameList] = useState([]);
    const [currentGame, setCurrentGame] = useState(null);
    const [gameIDCounter, setGameIDCounter] = useState(parseInt(localStorage.getItem("gameIDCounter")) || 1);

    function createGame(newGame) {
        const newGameList = [...gameList, newGame];
        localStorage.setItem("games", JSON.stringify(newGameList));
        setGameList(newGameList);
        setCurrentGame(newGame);
        setGameIDCounter(pastCounter => pastCounter + 1);
    }

    function updateGameArray(slot) {
        console.log("update")
        const newArray = {...currentGame.gameArray};
        newArray[slot] = "X";
        const games = JSON.parse(localStorage.getItem("games"));
        for (let i=0; i < games.length; i++) {
            if (games[i].id === currentGame.id) {
                games[i].gameArray = newArray;
                games[i].turn = games[i].opponentName
                setCurrentGame(games[i]);
                break;
            }
        }
        setGameList(games);
        console.log("games", games);
        localStorage.setItem("games", JSON.stringify(games));
    }

    useEffect(() => {
        localStorage.setItem("gameIDCounter", gameIDCounter);
    }, [gameIDCounter]);

    useEffect(() => {
        const gamesText = localStorage.getItem("games");
        if (gamesText) {
            const savedGames = JSON.parse(gamesText);
            setGameList(savedGames);
            if (savedGames.length > 0) {
                setCurrentGame(savedGames[0]);
            }
        }
    }, []);


    const gameRows = []
    if (gameList.length) {
        for (const [i, game] of gameList.entries()) {
            gameRows.push(
                <option key={game.id} value={game.id}>{game.id}: {game.opponentName}</option>
            )
        }
    }

    function updateCurrentGame(id) {
        const newCurrentGame = gameList.find((game) => game.id === id);
        setCurrentGame(newCurrentGame);
    }

    function askChatGPT() {
        setChatGPTMessage("The best move based on your current situation would be...")
    }

    return (
        <main>
            <h2>Game</h2>
            <p>Logged in as {props.userEmail}</p>
            {currentGame ? (
                <>
                    <h3>ID: {currentGame.id} |  Opponent: {currentGame.opponentName}</h3>
                    <form>
                        <label htmlFor="gamechoice">Choose game:</label>
                        <select className="gamechoice" id="gamechoice" onChange={(e) => updateCurrentGame(parseInt(e.target.value))}>
                            {gameRows}
                        </select>
                    </form>
                    <TicTacToe gameArray={currentGame.gameArray} updateGameArray={updateGameArray} gameID={currentGame.id} currentTurn={currentGame.turn} userEmail={props.userEmail}/>
                    {currentGame.turn === props.userEmail && 
                        <p>Your turn...</p>
                    }
                    {currentGame.turn !== props.userEmail &&
                        <p>{currentGame.opponentName}'s turn...</p>
                    }
                    <br />
                    <br />    
                    <p>Need help? Ask ChatGPT for the best next move!</p>
                    <button onClick={askChatGPT}>Ask ChatGPT</button>
                    <p>{chatGPTMessage}</p>
                </>
            ) : (<span></span>)
            }
            <div>
                <h3>Start a Game!</h3>
                <StartGame createGame={createGame} gameIDCounter={gameIDCounter} userEmail={props.userEmail} />
            </div>


        </main>
    )
}