import React, { useState } from "react"
import "./TicTacToe.css"

export function TicTacToe (props) {

    const [tableArray, setTableArray] = useState(props.gameArray);


    return (
        <table className="ticTacToeTable">
            <tbody>
                <tr>
                    <td className="left ticTacToeCell" >{props.gameArray[0]}</td>
                    <td className="top-middle ticTacToeCell">{props.gameArray[1]}</td>
                    <td className="right ticTacToeCell">{props.gameArray[2]}</td>
                </tr>
                <tr>
                    <td className="left ticTacToeCell">{props.gameArray[3]}</td>
                    <td className="middle ticTacToeCell">{props.gameArray[4]}</td>
                    <td className="right ticTacToeCell">{props.gameArray[5]}</td>
                </tr>
                <tr>
                    <td className="ticTacToeCell">{props.gameArray[6]}</td>
                    <td className="bottom-middle ticTacToeCell">{props.gameArray[7]}</td>
                    <td className="ticTacToeCell">{props.gameArray[8]}</td>
                </tr>
            </tbody>

        </table>
    )
}