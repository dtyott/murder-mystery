import { GetActiveCharacter, GetItems } from "../storage/Register"

export default function Inventory() {
    const items = GetItems()
    const character = GetActiveCharacter()
    const myItems = items.filter(i=>i.owner_id == character.id)

    return <div>
        <h1>Inventory</h1>
        {myItems.map((item, i)=>{
            return <li key ={i}> {item.item_name} ({item.uses} uses remaining): {item.description} </li>
        })}
    </div>
}