import {React} from 'react';
import { GetActiveCharacter, GetActiveGame } from '../storage/Register';

export default function Home() {
    const active_game = GetActiveGame()
    const active_char = GetActiveCharacter()

    return <div>
        <h1>{active_game? "Current game is "+ active_game.id: "No active game"}</h1>
        <h1>{active_char? "Welcome " +active_char.name:"Create a character"}</h1>
           </div>
}