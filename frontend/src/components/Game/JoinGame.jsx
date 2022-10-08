import {React, useState, useEffect} from 'react';
import { CREATE_CHARACTER_ENDPOINT } from "../../api/Endpoints";
import { setActiveGameId, setAttributeForGame } from "../../storage/Keys";
import { PostData } from "../../api/PostOffice";
import { GetGames, GetRandomIds } from "../../storage/Register";
import { CharacterSelector } from "../Character/CharacterSelector";
import { GameSelector } from './GameSelector';

export default function JoinGame() {
    const gameIds = GetGames()
    const randomIds = GetRandomIds()

    const [nameText, setNameText] = useState("")

    const [gameId, setGameId] = useState({})
    useEffect(() => {
      setGameId(gameIds[0] || {game_id:""})
    }, [gameIds]);
  
    function handleClick(){
      const char_id = randomIds.randomCharacterId.id 
      const character = {
          'name': nameText,
          'backstory': "",
          'game_id': gameId.game_id,
          'id': char_id
      };
      setActiveGameId(gameId.game_id)
      setAttributeForGame('character_id', gameId.game_id, char_id)
      PostData(CREATE_CHARACTER_ENDPOINT, character)
    }

    return <div>
        <GameSelector gameId = {gameId} gameIds = {gameIds} setGameId = {setGameId}/>
        <CharacterSelector nameText = {nameText} setNameText = {setNameText} handleClick = {handleClick}/>
    </div>
}