import {TextField } from "@mui/material";
import {React} from 'react';
import Button from '@mui/material/Button';

export function CharacterSelector(props) {
    return <div>
        <form>
        <TextField
        label="Name"
        color="secondary"
        focused
        value={props.nameText}
        onChange={(e)=>props.setNameText(e.target.value)}
        placeholder="Boo Boo"
        autoComplete="off" 
        />
        </form>
        <Button
        onClick = {(_)=>props.handleClick()}
        >
        CREATE CHARACTER
          </Button>
        </div>
}