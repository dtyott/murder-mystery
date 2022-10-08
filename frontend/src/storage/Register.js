import { getAttributeForGame, getActiveGameId } from "./Keys";
import {useContext} from 'react';
import {StoreContext} from "./Store";

export function GetActiveCharacter() {
    const storedData = useContext(StoreContext)
    const cached_game_id = getActiveGameId()
    const cached_char_id = getAttributeForGame('character_id', cached_game_id)
    const active_char = (storedData.characters || []).filter(x=>x.id==cached_char_id)
    return active_char.length>0? active_char[0] : {}
}

export function GetActiveGame() {
    const storedData = useContext(StoreContext)
    const cached_game_id = getActiveGameId()
    const active_game = (storedData.games || []).filter(x=>x.id==cached_game_id)
    return active_game.length>0? active_game[0] : null
}

export function GetRandomIds() {
    const storedData = useContext(StoreContext)
    return {
      randomGameId: storedData.randomGameId||{},
      randomCharacterId: storedData.randomCharacterId||{},
      randomWagerId: storedData.randomWagerId||{},
      randomItemId: storedData.randomItemId||{},
      randomStoreId: storedData.randomStoreId||{}
    }
}

export function GetGames() {
    const storedData = useContext(StoreContext)
    return storedData.games || []
}

export function GetCharacters() {
    const storedData = useContext(StoreContext)
    const charactersRaw = storedData.characters || []
    const activeGame = GetActiveGame()
    const activeGameId = activeGame? activeGame.id: null
    return charactersRaw.filter(c => c.game_id == activeGameId)
}

export function GetWagers() {
    const storedData = useContext(StoreContext)
    const wagersRaw = storedData.wagers || []
    const activeGame = GetActiveGame()
    const activeGameId = activeGame? activeGame.id: null
    return wagersRaw.filter(w => w.game_id == activeGameId) || []
}

export function GetItems() {
    const storedData = useContext(StoreContext)
    const itemsRaw = storedData.items || []
    const activeGame = GetActiveGame()
    const activeGameId = activeGame? activeGame.id: null
    return itemsRaw.filter(w => w.game_id == activeGameId) || []
}

export function GetStores() {
    const storedData = useContext(StoreContext)
    const storesRaw = storedData.stores || []
    const activeGame = GetActiveGame()
    const activeGameId = activeGame? activeGame.id: null
    return storesRaw.filter(w => w.game_id == activeGameId) || []
}

export function GetFastLoadTimeStamp() {
    const storedData = useContext(StoreContext)
    const updateFast = storedData.updateTimeFast
    return updateFast
}