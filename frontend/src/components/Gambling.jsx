import {React, useContext, useState} from 'react';
import { getActiveGameId, getAttributeForGame } from '../storage/Keys';
import {StoreContext} from "../storage/Store";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { PostData } from '../api/PostOffice';
import { CREATE_WAGER_ENDPOINT } from '../api/Endpoints';
import { compose } from '@mui/system';



export default function Gambling() {
    const [wagers, setWagers] = useState([])
    const [messages, setMessages] = useState([])


    const storedData  = useContext(StoreContext)
    console.log(storedData)
    const characters = storedData.characters || []
    const active_game_id = getActiveGameId()
    const active_char_name = getAttributeForGame('name', active_game_id)
    const active_char_role = getAttributeForGame('role', active_game_id)

    function handleWagers(name, role, wager) {
        var newWagers = wagers.map((w)=>{
            return (w.name==name && w.role ==role)? {name: name, role: role, wager:wager}:w
        })
        const existingWagers = getUserRoleMatch(wagers, name, role)
        if (existingWagers.length==0) {
            newWagers = [...newWagers, {name:name, role:role, wager:wager}]
        }
        setWagers(newWagers)
    }

    function handleMessages(name, role, message) {
        var newMessages = messages.map((w)=>{
            return (w.name==name && w.role ==role)? {name: name, role: role, message:message}:w
        })
        const existingMessages = getUserRoleMatch(messages, name, role)
        if (existingMessages.length==0) {
            newMessages = [...newMessages, {name:name, role:role, message:message}]
        }
        setMessages(newMessages)
    }

    function getUserRoleMatch(arr, name, role) {
        const matches = arr.filter((x)=>{
            return (x.name==name) && (x.role==role)
        })
        if (matches.length>0){
            return matches[0]
        }
        else {
            return ""
        }
    }

    function handleSubmitWager(char_name, char_role) {
        const wager = getUserRoleMatch(wagers, char_name, char_role).wager
        const message = getUserRoleMatch(messages, char_name, char_role).message
        const character1 = {
            name: active_char_name,
            role: active_char_role
        }
        const character2 = {
            name: char_name,
            role: char_role
        }
        const data = {
            character1: character1,
            character2: character2,
            message: message,
            game_id: active_game_id,
            amount: wager}
        PostData(CREATE_WAGER_ENDPOINT, data)

    }


    return <div>
        <h1>{active_game_id? "Current game is "+ active_game_id: "No active game"}</h1>
        <h2>Active Wagers</h2>
        {(storedData.wagers || []).map((w,i)=>{
            return <li key={i}>{w.character1.name+" the "+w.character1.role} bets {w.character2.name+ " the "+ w.character2.role} ${w.amount} over {w.message}</li>
        })}
        {characters.map((character,i)=>{
            const isYou = (character.name==active_char_name) && (character.role==active_char_role)
            const myAmount = (storedData.characters || []).filter(c=>{
                return (c.role==active_char_role) && (c.name==active_char_name)
            }).map(x=>x.money)
            const myMoney = myAmount.length==1? myAmount[0]: null
            const youString = isYou? " (You)":""
            const wagering = getUserRoleMatch(wagers, character.name, character.role).wager || 0
            const existingRisk = (storedData.wagers || []).filter(x=>{
    return ((x.character1.name==active_char_name) && (x.character1.role==active_char_role)) ||
                ((x.character2.name==active_char_name) && (x.character2.role==active_char_role))
            }).map(w=>w.amount).reduce((a,b)=> a+b,0) || 0
            const tooMuchRisk = (parseInt(wagering) + existingRisk-myMoney) > 0
            console.log(myAmount)
            console.log(myMoney)
            console.log(wagering)
            console.log(existingRisk)
            console.log(tooMuchRisk)
            console.log(wagering + existingRisk-myMoney)
            return <Accordion key={i}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{character.name} the {character.role}: ${character.money}{youString}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <TextField
          required
          id="outlined-required"
          label="Wager ($)"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          value ={getUserRoleMatch(wagers, character.name, character.role).wager || ""}
          onChange ={(e=> handleWagers(character.name, character.role, e.target.value))}
          disabled = {isYou}
        />
        <TextField
          required
          id="outlined-required"
          label="Condition"
          value ={getUserRoleMatch(messages, character.name, character.role).message || ""}
          onChange ={(e=> handleMessages(character.name, character.role, e.target.value))}
          disabled = {isYou}
        />
        <Button disabled = {isYou || tooMuchRisk} onClick={(_)=> handleSubmitWager(character.name, character.role)}>
        {isYou? "CANT BET SELF": tooMuchRisk? "INADEQUATE FUNDS": "PLACE BET"}
        </Button>
            </AccordionDetails>
          </Accordion>
            
            
            
        })}
           </div>
}