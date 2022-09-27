import {React, useState, useContext, useEffect} from 'react';
import { POTENTIAL_CHARACTER_ENDPOINT, CREATE_CHARACTER_ENDPOINT } from "../api/Endpoints";
import { setActiveGameId, setAttributeForGame } from "../storage/Keys";
import { PostData } from "../api/PostOffice";
import CharacterCard from "./CharacterCard";
import { GetGames, GetRandomIds } from "../storage/Register";
import { CharacterSelector } from "./CharacterSelector";
import { GameSelector } from './GameSelector';


export default function JoinGame() {
    const gameIds = GetGames()
    const randomIds = GetRandomIds()

    const [nameText, setNameText] = useState("")
    const [roleText, setRoleText] = useState("")
    const [fullNameText, setFullNameText] = useState("")
    const [characterText, setCharacterText] = useState([])
    const [selectedCharacter, setSelectedCharacter] = useState(-1)
    const [gameId, setGameId] = useState({})
    useEffect(() => {
      setGameId(gameIds[0] || {game_id:""})
    }, [gameIds]);
  
    function handleClick(){
      const newFullName = nameText + " the " + roleText
      setFullNameText(newFullName)
      const input_character = {
        name: newFullName,
        id: "",
        game_id: gameId.game_id
      }

        PostData(POTENTIAL_CHARACTER_ENDPOINT, input_character, setCharacterText)
    }

    function handleCreate(){
        const char_id = randomIds.randomCharacterId.id 
        const character = {
            'name': fullNameText,
            'backstory': characterText.backstories? characterText.backstories[selectedCharacter]:"",
            'game_id': gameId.game_id,
            'id': char_id
        };
        setActiveGameId(gameId.game_id)
        setAttributeForGame('character_id', gameId.game_id, char_id)
        PostData(CREATE_CHARACTER_ENDPOINT, character)
    }

    return <div>
        <GameSelector gameId = {gameId} gameIds = {gameIds} setGameId = {setGameId}/>
        <CharacterSelector nameText = {nameText} roleText = {roleText} setNameText = {setNameText} setRoleText = {setRoleText} handleClick = {handleClick}/>
        {(characterText.backstories || []).map((text,i)=>{
            const selected = selectedCharacter==i
            return <CharacterCard key = {i} selected = {selected} text = {text} handleCreate = {handleCreate} setSelectedCharacter = {setSelectedCharacter}
                    fullNameText = {fullNameText}
                    index = {i}/> })}
                    <h1>New Char Id is {randomIds.randomCharacterId.id }</h1>
    </div>
}