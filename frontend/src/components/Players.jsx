import {React, useContext, useState} from 'react';
import { getActiveGameId, getAttributeForGame, setAttributeForGame } from '../storage/Keys';
import {StoreContext} from "../storage/Store";
import { Button } from '@mui/material';

export default function Players() {
    const storedData  = useContext(StoreContext)
    const characters = storedData.characters || []
    const [active_game_id, setActiveGameId] = useState(getActiveGameId())
    const [active_char_name, setActiveCharName] = useState(getAttributeForGame('name', active_game_id))
    const [active_char_role, setActiveCharRole] = useState(getAttributeForGame('role', active_game_id))

    function handleClick(i) {
        const newName = characters[i].name
        const newRole = characters[i].role
        setAttributeForGame('name', active_game_id, newName)
        setAttributeForGame('role', active_game_id, newRole)
        setActiveCharName(getAttributeForGame('name', active_game_id))
        setActiveCharRole(getAttributeForGame('role', active_game_id))
    }

    return <div>
        <h1>{active_game_id? "Current game is "+ active_game_id: "No active game"}</h1>
        {characters.map((character,i)=>{
            const isYou = (character.name==active_char_name) && (character.role==active_char_role)
            const youString = isYou? " (You)":""
            
            return <div key={i} >
            <h2>{character.name} the {character.role}{youString}</h2> 
            <li>{character.backstory}</li>
            <Button onClick={(e)=>handleClick(i)}>
                Pick Me!
            </Button>
            </div>
            
        })}
           </div>
}