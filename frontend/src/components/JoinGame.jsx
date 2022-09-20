import {TextField } from "@mui/material";
import {React, useState, useContext, useEffect} from 'react';
import { POTENTIAL_CHARACTER_ENDPOINT, CREATE_CHARACTER_ENDPOINT } from "../api/Endpoints";
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
    const gameIds = (storedData.gameIds || [])//.map(x=>x.game_id)
    
    const [nameText, setNameText] = useState("")
    const [roleText, setRoleText] = useState("")
    const [characterText, setCharacterText] = useState([])
    const [selectedCharacter, setSelectedCharacter] = useState(-1)
    const [gameId, setGameId] = useState({})

    useEffect(() => {
      setGameId(gameIds[0] || {game_id:""})
    }, [gameIds]);
  
    function handleClick(){
      const input_character = {
        name: nameText,
        role: roleText
      }
        PostData(POTENTIAL_CHARACTER_ENDPOINT, input_character, setCharacterText)
    }

    function handleCreate(){

        const character = {
            'name': nameText,
            'role': roleText,
            'backstory': characterText.backstories? characterText.backstories[selectedCharacter]:"",
            'game_id': gameId.game_id
        };
        PostData(CREATE_CHARACTER_ENDPOINT, character)
        postprocessCreate()
    }

    function postprocessCreate(){
        setActiveGameId(gameId.game_id)
        setAttributeForGame('name', gameId.game_id, nameText)
        setAttributeForGame('role', gameId.game_id, roleText)
    }

    return <div>
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <NativeSelect
          value={gameId.game_id}
          onChange={(e)=>setGameId({game_id:e.target.value})}

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
            return <Card 
            key={i} style={{marginBottom: "20px", marginLeft: "250px", marginRight: "250px",  backgroundColor: selected?"LightCyan":"Ivory"}} >
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {characterText.name} the {characterText.role}
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