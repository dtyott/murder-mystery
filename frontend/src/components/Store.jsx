import React from 'react';
import { GetActiveCharacter, GetActiveGame } from '../storage/Register';

export default function Store() {

    const active_game_id = GetActiveGame()
    const active_char = GetActiveCharacter()
    return <div>
        <h1>{active_game_id? "Store: Current game is "+ active_game_id.id: "No active game"}</h1>
        <h1>{active_game_id? "Welcome " +active_char.name:""}</h1>
           </div>
}