import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



export default function WagerCard(props) {

    const noBet = !(props.message || props.amount)
    const youString = " (You) "
    const char_id = props.character.id
    const my_id = props.me.id
    const isMe = char_id == my_id
    const money = props.me.money
    const tooMuchRisk = (money - (props.existingRisk) - parseInt(props.amount)||0) < 0
    
    return <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>{props.character.name}: ${props.character.money}{isMe?youString:""}</Typography>
    </AccordionSummary>
    <AccordionDetails>
    <TextField
  required
  id="outlined-required"
  label="Wager ($)"
  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
  value ={props.amount}
  onChange ={(e=> props.handleAmounts(props.character.id, e.target.value))}
  disabled = {isMe}
/>
<TextField
  required
  id="outlined-required"
  label="Condition"
  value ={props.message}
  onChange ={(e=> props.handleMessages(props.character.id, e.target.value))}
  disabled = {isMe}
/>
<Button disabled = {isMe || tooMuchRisk || noBet} onClick={(_)=> props.handleSubmitWager(props.character.id)}>
{isMe? "CANT BET SELF": tooMuchRisk? "INADEQUATE FUNDS": "PLACE BET"}
</Button>
    </AccordionDetails>
  </Accordion>
}