import {React, useState} from 'react';
import { PostData, UpdateData } from '../api/PostOffice';
import { CREATE_WAGER_ENDPOINT, UPDATE_WAGER_ENDPOINT } from '../api/Endpoints';
import WagerCard from "./WagerCard";
import WagerLine from './WagerLine';
import { GetActiveCharacter, GetActiveGame, GetCharacters, GetRandomIds, GetWagers } from "../storage/Register"
import { getAcceptedWagers, getActiveWagers, getOutstandingWagerRisk, getWagersForCharacter } from "../utils/gamblingUtils"


export default function Gambling() {
    const wager_id = GetRandomIds().randomWagerId.id
    const game = GetActiveGame()
    const characters = GetCharacters()
    const wagers = GetWagers()
    const character = GetActiveCharacter()
    const activeWagers = getActiveWagers(wagers)
    const myWagers = getWagersForCharacter(activeWagers, character)
    const myAcceptedWagers = getAcceptedWagers(myWagers)
    const existingRisk = getOutstandingWagerRisk(myAcceptedWagers, character)
    const [amounts, setAmounts] = useState({})
    const [messages, setMessages] = useState({})

    function handleMessages(char_id, msg) {
        const messagesCopy = {...messages}
        messagesCopy[char_id] = msg
        setMessages(messagesCopy)
    }

    function handleAmounts(char_id, amt) {
        const amountsCopy = {...amounts}
        amountsCopy[char_id] = amt
        setAmounts(amountsCopy)
    }

    function handleSubmitWager(char_id) {
        const char1_id = character.id
        const char2_id = char_id

        const data = {
            id: wager_id,
            message: messages[char_id]||"",
            game_id: game.id,
            char1_id: char1_id,
            char2_id: char2_id,
            amount: amounts[char_id]||0,

        }
        PostData(CREATE_WAGER_ENDPOINT, data)
    }

    function handleAccept(wager, accept) {
        const data = {
            id: wager.id,
            game_id: wager.game_id,
            accepted: accept
        }
        if (!accept) {
            data['active'] = false
        }


        return UpdateData(UPDATE_WAGER_ENDPOINT, data) 
    }

    return <div>
            <h1>New Gambling</h1>
            {myWagers.map((w,i)=>{
                return <WagerLine
                key= {i}
                character = {character}
                characters = {characters}
                wager = {w}
                me = {character}
                existingRisk = {existingRisk}
                handleAccept = {handleAccept}
                />
            })}
            {characters.map((c,i)=>{
                return <WagerCard
                key = {i}
                existingRisk = {existingRisk}
                character = {c}
                me = {character}
                message = {messages[c.id]||""}
                amount = {amounts[c.id]||""}
                handleAmounts = {handleAmounts}
                handleMessages = {handleMessages}
                handleSubmitWager = {handleSubmitWager}
                />
            })}
           </div>
}