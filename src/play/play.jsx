import React from "react";

export function Play(props) {
    function askChatGPT() {
        return (
            <p>The best move based on your current situation would be...</p>
        )
    }

    return (
        <main>
            <h2>Game</h2>
            <p>Logged in as {props.userEmail}</p>
            <h3>ID: 1 |  Opponent: Bob McDonald</h3>
            <form>
                <label htmlFor="gamechoice">Choose game:</label>
                <select name="gamechoice" id="gamechoice">
                    <option value="1">1: Bob McDonald</option>
                    <option value="2">2: Billy Joel</option>
                    <option value="3">3: Jimbo James</option>
                </select>
            </form>
            <img src="../img/placeholder_game.png" alt="Placeholder image for Tic Tac Toe game" />
            <p>Your turn...</p>
            <br />
            <br />    
            <p>Need help? Ask ChatGPT for the best next move!</p>
            <button onClick={askChatGPT}>Ask ChatGPT</button>
            <p></p>
        </main>
    )
}