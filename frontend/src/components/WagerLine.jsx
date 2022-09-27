import { formatWagerForCharacter } from "../utils/gamblingUtils"
import { Button } from "@mui/material"

export default function WagerLine(props) {
    const money = props.me.money
    const wager = props.wager
    const amount = wager.amount
    const accepted = wager.accepted
    const myBet = wager.char1_id == props.me.id
    const tooMuchRisk = (money - props.existingRisk - amount) < 0
    const cantAccept = (accepted || tooMuchRisk)
    const showAccept = (!accepted && !myBet)
    return <div> 
    {formatWagerForCharacter(wager, props.character, props.characters)}
    { showAccept? <Button disabled = {cantAccept} onClick = {(e) => props.handleAccept(wager, true)} variant="contained" color="success">
                        Accept
                    </Button> :null}
    { accepted? null: <Button onClick = {(e) => props.handleAccept(wager, false)} variant="contained" color="error">
                        Decline
                    </Button>}
    </div>
}