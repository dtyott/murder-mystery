import React from 'react';
import { getActiveGameId, getAttributeForGame } from '../storage/Keys';


export default function Store() {

    const active_game_id = getActiveGameId()
    const active_char_name = getAttributeForGame('name', active_game_id)
    const active_char_role = getAttributeForGame('role', active_game_id)
    return <div>
        <h1>{active_game_id? "Store: Current game is "+ active_game_id: "No active game"}</h1>
        <h1>{active_game_id? "Welcome " +active_char_name + " the "+ active_char_role:""}</h1>
           </div>
}