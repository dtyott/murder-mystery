import { formatWagerForCharacter } from "../utils/gamblingUtils"
import { Button } from "@mui/material"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

export default function WagerLine(props) {
    const money = props.me.money
    const wager = props.wager
    const amount = wager.amount
    const accepted = wager.accepted
    const myBet = wager.char1_id == props.me.id
    const tooMuchRisk = (money - props.existingRisk - amount) < 0
    const cantAccept = (accepted || tooMuchRisk)
    const showAccept = (!accepted && !myBet)
    const myId = myBet? 'char1': 'char2'
    const myDeclaration = myId + '_declare_win'
    const myVote = wager[myDeclaration]
    const victory = myVote === true
    const defeat = myVote === false
    const settled = victory || defeat
    const downColor = settled?(defeat?'Red':'Grey'): 'LightPink'
    const upColor = settled?(victory?'Green':'Grey'): 'LightGreen'

    return <div> 
    {formatWagerForCharacter(wager, props.character, props.characters)}
    { showAccept? <Button disabled = {cantAccept} onClick = {(e) => props.handleAccept(wager, true)} variant="contained" color="success">
                        Accept
                    </Button> :null}
    { accepted? <div>
        <ThumbDownIcon onClick = {(e) => props.handleVictory(wager, myDeclaration, false)} style={{color: downColor, padding: '5px'}}/> 
        <ThumbUpIcon onClick = {(e) => props.handleVictory(wager, myDeclaration, true)} style={{color: upColor, padding: '5px'}}/>
        </div>: <Button 
        onClick = {(e) => props.handleAccept(wager, false)} variant="contained" color="error">
                Decline
                </Button>}
    </div>
}