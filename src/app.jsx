import React from 'react';
import './app.css';

export default function App() {
  return (
    <>
        <header>
            <h1>TIC TAC TOE</h1>
            <nav>
                <ul className="navbar">
                    <li><a className="navbar_item" href="index.html">Play</a></li>
                    <li><a className="navbar_item" href="login.html">Login</a></li>
                    <li><a className="navbar_item active" href="games.html">Games</a></li>
                </ul>
            </nav>
        </header>

        <main>hello</main>

        <footer>
            <hr />
            <span><a href="https://github.com/JonahLarsen/startup">Github Repo: https://github.com/JonahLarsen/startup</a></span>
            <br />
            <span>Created by Jonah Larsen</span>
        </footer>
    </>
  );
}