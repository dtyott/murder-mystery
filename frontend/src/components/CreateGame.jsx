import {Button } from "@mui/material";
import {React, useContext} from 'react';
import { PostMessage } from "../api/PostOffice";
import { CREATE_GAME_ENDPOINT } from "../api/Endpoints";
import {StoreContext} from "../storage/Store";

export default function CreateGame() {
    const storedData = useContext(StoreContext)
    const gameText = (storedData.randomGame || {}).game_id
    
    return <div>
        <h1>{gameText}</h1>
        <Button
        variant = "contained"
        onClick = {(_)=> PostMessage(CREATE_GAME_ENDPOINT, {game_id: gameText})}
        />
           </div>
}