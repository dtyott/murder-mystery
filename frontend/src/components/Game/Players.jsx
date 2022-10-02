import {React, useState} from 'react';
import { getAttributeForGame, setAttributeForGame } from '../../storage/Keys';
import { Button } from '@mui/material';
import { GetActiveGame, GetCharacters } from '../../storage/Register';

export default function Players() {
    const characters = GetCharacters()
    const activeGame = GetActiveGame()
    const active_game_id = activeGame? activeGame.id: null
    const [active_char_id, setActiveCharId] = useState(getAttributeForGame('character_id', active_game_id))

    function handleClick(i) {
        const newId = characters[i].id
        setAttributeForGame('character_id', active_game_id, newId)
        setActiveCharId(getAttributeForGame('character_id', active_game_id))
    }

    return <div style={{paddingBottom: "100px"}}>
        <h1>{active_game_id? "Current game is "+ active_game_id: "No active game"}</h1>
        {characters.map((character,i)=>{
            const isYou = (character.id==active_char_id)
            const youString = isYou? " (You)":""
            
            return <div key={i} >
            <h2>{character.name}{youString}</h2> 
            <li>{character.backstory}</li>
            <Button onClick={(e)=>handleClick(i)}>
                Pick Me!
            </Button>
            </div>
            
        })}
           </div>
}