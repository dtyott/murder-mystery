import './App.css';
import React from "react";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Home from './components/Home';
import Header from './components/Header';
import Players from './components/Game/Players';
import Store from './components/Store/Store';
import Inventory from './components/Inventory';
import JoinGame from './components/Game/JoinGame';
import CreateGame from './components/Game/CreateGame';
import Gambling from './components/Gambling/Gambling';

function App() {

  const pages = ['create_game','join_game','home', 'players', 'store', 'inventory', 'gambling']

  return (
    <Router>
        <Routes>
          <Route exact path = "/create_game" element={<CreateGame/>} />
          <Route exact path = "/join_game" element = {<JoinGame/>}/>
          <Route exact path = "/home" element = {<Home/>}/>
          <Route exact path = "/players" element = {<Players/>}/>
          <Route exact path = "/store" element = {<Store/>}/>
          <Route exact path = "/inventory" element = {<Inventory/>}/>
          <Route exact path = "/gambling" element = {<Gambling/>}/>
        </Routes>
        <Header pages={pages}/>      
    </Router>
      );}

export default App;
