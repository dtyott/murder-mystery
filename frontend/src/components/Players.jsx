import {React, useContext} from 'react';
import { getActiveGameId, getAttributeForGame } from '../storage/Keys';
import {StoreContext} from "../storage/Store";

export default function Players() {
    const storedData  = useContext(StoreContext)
    const characters = storedData.characters || []
    const active_game_id = getActiveGameId()
    const active_char_name = getAttributeForGame('name', active_game_id)
    const active_char_role = getAttributeForGame('role', active_game_id)
    return <div>
        <h1>{active_game_id? "Current game is "+ active_game_id: "No active game"}</h1>
        {characters.map((character,i)=>{
            const isYou = (character.name==active_char_name) && (character.role==active_char_role)
            const youString = isYou? " (You)":""
            
            return <div key={i}>
            <h2>{character.name} the {character.role}{youString}</h2> 
            <li>{character.backstory}</li>
            </div>
            
        })}
           </div>
}