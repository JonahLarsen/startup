import React from "react";
import "./games.css"

export function Games() {
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
                    <tr>
                        <td>1</td>
                        <td>Bob McDonald</td>
                        <td>Yours</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Billy Joel</td>
                        <td>Theirs</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Jimbo James</td>
                        <td>Theirs</td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <h2>Record</h2>
            <span>Wins: 5</span><br/>
            <span>Losses: 3</span><br/>
            <span>W/L Ratio: 1.67 </span><br/>
            <div className="image_div"><img src="img/positive_record.png" alt="Image of a green plus sign to indicate a strong W/L Ratio"/></div>
        </main>
    )
}