import React, { useState, useEffect } from "react";
import { StartGame } from "./startGame";
import { TicTacToe } from "./TicTacToe";

export function Play(props) {
    const [chatGPTMessage, setChatGPTMessage] = useState("")
    const [gameList, setGameList] = useState([]);
    const [currentGame, setCurrentGame] = useState(null);
    const [gameIDCounter, setGameIDCounter] = useState(1);


    async function createGame(newGame) {
        const newGameList = [...gameList, newGame];

        await fetch("/api/game", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(newGameList),
        });

        setGameList(newGameList);
        setCurrentGame(newGame);

        await fetch("/api/gameIDCounter/increment", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(message => {
                console.log(message);
            })
    }

    function updateGameArray(slot) {
        const newArray = {...currentGame.gameArray};
        newArray[slot] = "X";
        const games = structuredClone(gameList);
        for (let i=0; i < games.length; i++) {
            if (games[i].id === currentGame.id) {
                games[i].gameArray = newArray;
                games[i].turn = games[i].opponentName
                setCurrentGame(games[i]);
                break;
            }
        }
        setGameList(games);
        
        fetch("/api/game", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(games),
        })
            .then(res => res.json())
            .then(message => {
                console.log("updated games:", message);
            })
            .catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        if (!currentGame) {
            return;
        }
        const interval = setInterval(() => {
            console.log("interval")
            const newArray = {...currentGame.gameArray};
            for (let i=0; i < 9; i++) {
                if (currentGame.turn === currentGame.opponentName && newArray[i] === " ") {
                    newArray[i] = "O";
                    const games = structuredClone(gameList);
                    for (let j=0; j < games.length; j++) {
                        if (games[j].id === currentGame.id) {
                            games[j].gameArray = newArray;
                            games[j].turn = props.userEmail;
                            setCurrentGame(games[j]);
                            break;
                        }
                    }
                    setGameList(games);
                    fetch("/api/game", {
                        method: "POST",
                        headers: {
                            "Content-Type" : "application/json"
                        },
                        body: JSON.stringify(games),
                    })
                        .then(res => res.json())
                        .then(message => {
                            console.log("updated games:", message);
                        })
                        .catch(err => {
                            console.error(err);
                        })
                    break;
                }
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentGame, props.userEmail]);


    useEffect(() => {
        function checkRowWin (leftIndex) {
            if (currentGame.gameArray[leftIndex] !== " " && currentGame.gameArray[leftIndex] === currentGame.gameArray[leftIndex + 1] && currentGame.gameArray[leftIndex] === currentGame.gameArray[leftIndex + 2]) {
                if (currentGame.gameArray[leftIndex] === "X") {
                    return true;
                }
                if (currentGame.gameArray[leftIndex] === "O") {
                    return false;
                }
            }
        }
        function checkColumnWin (topIndex) {
            if (currentGame.gameArray[topIndex] !== " " && currentGame.gameArray[topIndex] === currentGame.gameArray[topIndex + 3] && currentGame.gameArray[topIndex] === currentGame.gameArray[topIndex + 6]) {
                if (currentGame.gameArray[topIndex] === "X") {
                    return true;
                }
                if (currentGame.gameArray[topIndex] === "O") {
                    return false;
                }
            }
        }
        function checkDiagnolWin() {
            if (currentGame.gameArray[0] !== " " && currentGame.gameArray[0] === currentGame.gameArray[4] && currentGame.gameArray[0] === currentGame.gameArray[8]) {
                if (currentGame.gameArray[0] === "X") {
                    return true;
                }
                if (currentGame.gameArray[0] === "O") {
                    return false;
                }
            }
            if (currentGame.gameArray[2] !== " " && currentGame.gameArray[2] === currentGame.gameArray[4] && currentGame.gameArray[2] === currentGame.gameArray[6]) {
                if (currentGame.gameArray[2] === "X") {
                    return true;
                }
                if (currentGame.gameArray[2] === "O") {
                    return false;
                }
            }
        }
        if (currentGame) {
            const userWon = checkRowWin(0) ?? checkRowWin(3) ?? checkRowWin(6) ?? checkColumnWin(0) ?? checkColumnWin(1) ?? checkColumnWin(2) ?? checkDiagnolWin();
            if (userWon || userWon === false) {
                if (userWon) {
                    fetch("/api/wins/increment", {
                        method: "PUT",
                        headers: {
                            "Content-type": "application/json",
                        },
                    });
                    alert("You Won!");
                } else {
                    fetch("api/losses/increment", {
                        method: "PUT",
                        headers: {
                            "Content-type": "application/json",
                        },
                    });
                    alert("You Lost!");
                }
                const listOfGames = structuredClone(gameList);
                const newListOfGames = listOfGames.filter(game => game.id !== currentGame.id);
                // console.log("hello", currentGame.id);
                // console.log("whatup", newListOfGames[1].id)
                // console.log(newListOfGames);
                fetch("/api/game", {
                        method: "POST",
                        headers: {
                            "Content-Type" : "application/json"
                        },
                        body: JSON.stringify(newListOfGames),
                    })
                        .then(res => res.json())
                        .then(message => {
                            console.log("updated games:", message);
                        })
                        .catch(err => {
                            console.error(err);
                        })
                setGameList(newListOfGames);
                if (newListOfGames.length > 0) {
                    setCurrentGame(newListOfGames[0]);
                } else {
                    setCurrentGame(null);
                }
            }
            console.log("win", userWon);
        }

    }, [currentGame]);

    useEffect(() => {

        fetch("/api/gameIDCounter")
            .then((response) => response.json())
            .then((counter) => {
                setGameIDCounter(counter.gameIDCounter);
        });

        fetch("/api/games")
            .then((response) => response.json())
            .then((games) => {
                setGameList(games);
                if (games.length > 0) {
                    setCurrentGame(games[0]);
                }
            })

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