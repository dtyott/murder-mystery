import {TextField } from "@mui/material";
import {React, useState, useContext} from 'react';
import { POTENTIAL_CHARACTER_ENDPOINT, CHARACTER_ENDPOINT } from "../api/Endpoints";
import CasinoIcon from '@mui/icons-material/Casino';
import { setActiveGameId, setAttributeForGame } from "../storage/Keys";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PostData } from "../api/PostOffice";
import {StoreContext} from "../storage/Store";



export default function JoinGame() {
    const storedData  = useContext(StoreContext)
    //console.log(storedData)
    const gameIds = storedData.gameIds
    //console.log(gameIds)
    const gameId = gameIds[0] || ""
    const [nameText, setNameText] = useState("")
    const [roleText, setRoleText] = useState("")
    const [characterText, setCharacterText] = useState([])
    const [selectedCharacter, setSelectedCharacter] = useState(-1)

  
    function handleClick(){
      const input_character = {
        name: nameText,
        role: roleText
      }
        const data = PostData(POTENTIAL_CHARACTER_ENDPOINT, input_character, setCharacterText)
        console.log(data)
        setCharacterText(data.backstories)
    }

    function handleCreate(){

        const character = {
            'name': nameText,
            'role': roleText,
            'backstory': characterText.backstories? characterText.backstories[selectedCharacter]:"",
            'game_id': gameId.game_id
        };
        const data = PostData(CHARACTER_ENDPOINT, character)
        postprocessCreate(data)
    }

    function postprocessCreate(data){
        setActiveGameId(data.game_id)
        setAttributeForGame('name', data.game_id, data.name)
        setAttributeForGame('role', data.game_id, data.role)
    }

    return <div>
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <NativeSelect
          defaultValue={gameId}
          inputProps={{
            name: 'gameId',
            id: 'controlled-native',
          }}
        >
            {gameIds.map((x, i)=>{
                return <option key={i} value={x.game_id}>{x.game_id}</option>
            })}
          
        </NativeSelect>
      </FormControl>
    </Box>
        <form>
        <TextField
        label=""
        color="secondary"
        focused
        value={nameText}
        onChange={(e)=>setNameText(e.target.value)}
        placeholder="User Name"
        autoComplete="off" 
        />
        </form>

        <form>
        <TextField
        label=""
        color="secondary"
        focused
        value={roleText}
        onChange={(e)=>setRoleText(e.target.value)}
        placeholder="Role"
        autoComplete="off"
        />
        </form>
        
        
        <CasinoIcon
        onClick = {(_)=>handleClick()}
        />
        {(characterText.backstories || []).map((text,i)=>{
            const selected = selectedCharacter==i
            return <Card key={i} sx={{ minWidth: 275, maxWidth:300 }} style={{backgroundColor: selected?"LightCyan":"Ivory"}} >
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {nameText} the {roleText}
              </Typography>
              <Typography variant="body2">
                {text}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick = {(_)=>selected? handleCreate():setSelectedCharacter(i)} size="small">{selected?"Create Character":"Choose Backstory"}</Button>
            </CardActions>
            
          </Card>
        })}
        
    </div>
}