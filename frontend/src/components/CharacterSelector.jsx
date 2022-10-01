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
<h2> The </h2>
        <form>
        <TextField
        label="Role"
        color="secondary"
        focused
        value={props.roleText}
        onChange={(e)=>props.setRoleText(e.target.value)}
        placeholder="Fool"
        autoComplete="off"
        />
        </form>
        <Button
        onClick = {(_)=>props.handleClick()}
        >
        ROLL BACKSTORY
          </Button>
        </div>
}