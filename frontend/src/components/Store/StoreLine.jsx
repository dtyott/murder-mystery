import { Button } from "@mui/material"
import ColorizeIcon from '@mui/icons-material/Colorize';
import FortIcon from '@mui/icons-material/Fort';
import PinchIcon from '@mui/icons-material/Pinch';
import ScienceIcon from '@mui/icons-material/Science';

const icons = {
    'Pistol': PinchIcon,
    'Knife': ColorizeIcon,
    'Armor': FortIcon,
    'Truth Serum': ScienceIcon
}

const rot = {
    'Pistol': 90,
    'Knife': 90
}

export default function StoreLine(props) {
    const store = props.store
    const inStock = store.quantity > 0
    const canAfford = props.liquidity >= store.cost

    const canBuy = inStock && canAfford
    const Icon = icons[store.item_name]
    const rotate = rot[store.item_name] || 0
    return <div>
    <h2>{store.item_name}: ${store.cost} ({store.quantity} in stock)</h2>
    <li>{store.description} ({store.uses} uses)</li>
    <Icon style = {{transform: 'rotate('+rotate+'deg)' }}></Icon>
    {<Button disabled = {!canBuy} onClick = {(e) => props.handleBuy(store)} variant="contained" color="success">
                {inStock?(canAfford?"BUY": "INSUFFICIENT FUNDS"): "OUT OF STOCK"}
            </Button>}
    </div>

    return null
}