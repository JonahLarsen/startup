import React, { useEffect, useState } from "react"
import "./TicTacToe.css"

export function TicTacToe (props) {


    // useEffect(() => {
    //     setTableArray(props.gameArray);
    // }, [props.gameArray]);


    return (
        <table className="ticTacToeTable">
            <tbody>
                <tr>
                    <td id="0" className="left ticTacToeCell" onClick={() => props.updateGameArray(0)} disabled={props.currentTurn !== props.userEmail}>{props.gameArray[0]}</td>
                    <td id="1" className="top-middle ticTacToeCell" onClick={() => props.updateGameArray(1)} disabled={props.currentTurn !== props.userEmail}>{props.gameArray[1]}</td>
                    <td id="2" className="right ticTacToeCell" onClick={() => props.updateGameArray(2)} disabled={props.currentTurn !== props.userEmail}>{props.gameArray[2]}</td>
                </tr>
                <tr>
                    <td id="3" className="left ticTacToeCell" onClick={() => props.updateGameArray(3)} disabled={props.currentTurn !== props.userEmail}>{props.gameArray[3]}</td>
                    <td id="4" className="middle ticTacToeCell" onClick={() => props.updateGameArray(4)} disabled={props.currentTurn !== props.userEmail}>{props.gameArray[4]}</td>
                    <td id="5" className="right ticTacToeCell" onClick={() => props.updateGameArray(5)} disabled={props.currentTurn !== props.userEmail}>{props.gameArray[5]}</td>
                </tr>
                <tr>
                    <td id="6" className="ticTacToeCell" onClick={() => props.updateGameArray(6)} disabled={props.currentTurn !== props.userEmail}>{props.gameArray[6]}</td>
                    <td id="7" className="bottom-middle ticTacToeCell" onClick={() => props.updateGameArray(7)} disabled={props.currentTurn !== props.userEmail}>{props.gameArray[7]}</td>
                    <td id="8" className="ticTacToeCell" onClick={() => props.updateGameArray(8)} disabled={props.currentTurn !== props.userEmail}>{props.gameArray[8]}</td>
                </tr>
            </tbody>

        </table>
    )
}