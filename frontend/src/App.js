import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import JoinGame from './components/JoinGame';
import CreateGame from './components/CreateGame';
import Home from './components/Home';
import Header from './components/Header';

function App() {

  const pages = ['create_game','join_game','home']

  return (
    <Router>
          
            <Header pages={pages}/>
            <Routes>
            <Route exact path="/create_game" element={<CreateGame/>} />
            <Route exact path ="/join_game" element = {<JoinGame/>}/>
            <Route exact path = "/home" element = {<Home/>}/>
            </Routes>
            
          
        </Router>
      );
}

export default App;
