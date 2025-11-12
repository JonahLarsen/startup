import React from "react"
export function StartGame (props) {
    return (
        <form>
            <div>
                <span>Enter your opponent's Email</span>
                <br/>
                <input type="text" placeholder="example@email.com" onChange={(e) => props.setOpponentEmail(e.target.value)}/>
            </div>
            <button type="submit" onClick={() => props.createGame()} >Create Game</button>
        </form>
    )
}