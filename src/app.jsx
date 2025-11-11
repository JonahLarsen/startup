import React, { useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Games } from './games/games';
import { Play } from './play/play';
import './app.css';

export default function App() {
    const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");
    let loggedIn = false;
    if (userEmail) {
        loggedIn = true;
    }
    const [authState, setAuthState] = useState(loggedIn);

  return (
    <BrowserRouter>
        <div className="body">
            <header>
            <h1>TIC TAC TOE</h1>
            <nav>
                <ul className="navbar">
                    {
                        loggedIn && 
                        <li><NavLink className="navbar_item" to="play">Play</NavLink></li>
                    }
                    <li><NavLink className="navbar_item" to="">Login</NavLink></li>
                    {
                        loggedIn && 
                        <li><NavLink className="navbar_item" to="games">Games</NavLink></li>
                    }
                </ul>
            </nav>
            </header>

            <Routes>
                <Route path='/' element={<Login/>} exact />
                <Route path='/play' element={<Play />} />
                <Route path='/games' element={<Games />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>    

            <footer>
                <hr />
                <span><a href="https://github.com/JonahLarsen/startup">Github Repo: https://github.com/JonahLarsen/startup</a></span>
                <br />
                <span>Created by Jonah Larsen</span>
            </footer>
        </div>
    </BrowserRouter>
  );
}

function NotFound() {
    return <main>Page doesn't exist.</main>
}