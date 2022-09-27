import {React, useContext, useState} from 'react';
import { getActiveGameId, getAttributeForGame, setAttributeForGame } from '../storage/Keys';
import {StoreContext} from "../storage/Store";
import { Button } from '@mui/material';

export default function Players() {
    const storedData  = useContext(StoreContext)
    const characters = storedData.characters || []
    const [active_game_id, setActiveGameId] = useState(getActiveGameId())
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