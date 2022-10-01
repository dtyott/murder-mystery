import {Button } from "@mui/material";
import {React} from 'react';
import { PostData } from "../api/PostOffice";
import { CREATE_GAME_ENDPOINT } from "../api/Endpoints";
import { GetRandomIds } from "../storage/Register";

export default function CreateGame() {
    const gameText = GetRandomIds().randomGameId.id
    
    return <div>
        <h1>{gameText}</h1>
        <Button
        variant = "contained"
        onClick = {(_)=> PostData(CREATE_GAME_ENDPOINT, {id: gameText, game_id: gameText})}
        >
            Create {gameText}
            </Button>
           </div>
}