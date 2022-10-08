import React from 'react';
import { GetActiveCharacter, GetActiveGame, GetRandomIds, GetWagers, TriggerFastDataRef } from '../../storage/Register';
import { GetStores } from '../../storage/Register';
import { getOutstandingWagerRisk } from '../Gambling/Utils';
import { UpdateData, PostData } from '../../api/PostOffice';
import { CREATE_ITEM_ENDPOINT, UPDATE_CHARACTER_ENDPOINT, UPDATE_STORE_ENDPOINT } from '../../api/Endpoints';
import StoreLine from './StoreLine';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../storage/Store';

export default function Store() {

    const active_char_id = GetActiveCharacter().id
    const item_id = GetRandomIds().randomItemId.id
    const active_char = GetActiveCharacter()
    const stores = GetStores()
    const wagers = GetWagers()
    const wagerRisk = getOutstandingWagerRisk(wagers, active_char)
    const money = active_char.money
    const [buys, setBuys] = useState(0)
    
    function handleBuy(store) {
        const store_data = {
            id: store.id,
            game_id: store.game_id,
            quantity: store.quantity - 1
        }

        const item_data = {
            id: item_id,
            game_id: store.game_id,
            description: store.description,
            item_name: store.item_name,
            uses: store.uses,
            owner_id: active_char_id

        }
        
        const character_data = {
            id: active_char_id,
            game_id: store.game_id,
            money: active_char.money - store.cost
        }
        UpdateData(UPDATE_STORE_ENDPOINT, store_data)
        UpdateData(UPDATE_CHARACTER_ENDPOINT, character_data)
        PostData(CREATE_ITEM_ENDPOINT, item_data)     
    }

    return <div>
        <h1>Store</h1>
        {stores.map((store,i)=>{
            const liquidity = money - wagerRisk

            return <StoreLine
            key = {i}
            store = {store}
            liquidity = {liquidity}
            handleBuy = {handleBuy}
            />
        })}
           </div>
}