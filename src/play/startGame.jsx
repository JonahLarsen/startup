import React, { useState } from "react"
export function StartGame (props) {
    const [opponentEmail, setOpponentEmail] = useState("")
    return (
        <form>
            <div>
                <span>Enter your opponent's Email</span>
                <br/>
                <input type="text" placeholder="example@email.com" onChange={(e) => setOpponentEmail(e.target.value)}/>
            </div>
            <button type="submit" onClick={() => props.createGame({id: props.gameIDCounter, opponentName: opponentEmail, turn: props.userEmail, gameArray:[" "," "," "," "," "," "," "," "," "]})} >Create Game</button>
        </form>
    )
}