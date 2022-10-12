import {React, createContext, useEffect, useState, useRef} from 'react'
import { RANDOM_GAME_ENDPOINT, RANDOM_CHARACTER_ENDPOINT, RANDOM_WAGER_ENDPOINT, RANDOM_ITEM_ENDPOINT, RANDOM_STORE_ENDPOINT,
GAME_ENDPOINT, CHARACTER_ENDPOINT, WAGER_ENDPOINT, ITEM_ENDPOINT, STORE_ENDPOINT, POLL_SPEED_SLOW, POLL_SPEED_FAST} from "../api/Endpoints";
import { PostData, GetData } from '../api/PostOffice';
import { getActiveGameId} from './Keys';
import { useInterval } from './Utils';


export const StoreContext = createContext(null)

export default ({ children }) => {
    const active_game_id = getActiveGameId()

    const game_id_dict = {game_id: active_game_id}
    const [randomGameId, setRandomGameId] = useState(null)
    const [randomWagerId, setRandomWagerId] = useState(null)
    const [randomCharacterId, setRandomCharacterId] = useState(null)
    const [randomItemId, setRandomItemId] = useState(null)
    const [randomStoreId, setRandomStoreId] = useState(null)
    const [games, setGames] = useState([])
    const [characters, setCharacters] = useState([])
    const [wagers, setWagers] = useState([])
    const [items, setItems] = useState([])
    const [stores, setStores] = useState([])
    const [updateTimeFast, setUpdateTimeFast] = useState(null)
    const [updateTimeSlow, setUpdateTimeSlow] = useState(null)
    const [connectionOpen, setConnectionOpen] = useState(false)

    const ws = useRef();

    const contentsDict = {
        [GAME_ENDPOINT]: {},
        [CHARACTER_ENDPOINT]: game_id_dict,
        [WAGER_ENDPOINT]: game_id_dict,
        [ITEM_ENDPOINT]: game_id_dict,
        [STORE_ENDPOINT]: game_id_dict
    }

    function setStateFromRoute(setter, route)  {
        const contents = contentsDict[route]
        const restMethod = contents? PostData:GetData
        restMethod(route, contentsDict[route], setter) 
    }

    function refDataSlow() {
        console.log("pulling data slow")
        setStateFromRoute(setRandomGameId, RANDOM_GAME_ENDPOINT)
        setStateFromRoute(setRandomCharacterId, RANDOM_CHARACTER_ENDPOINT)
        setStateFromRoute(setRandomWagerId, RANDOM_WAGER_ENDPOINT)
        setStateFromRoute(setRandomItemId, RANDOM_ITEM_ENDPOINT)
        setStateFromRoute(setRandomStoreId, RANDOM_STORE_ENDPOINT)
    }

    function refDataFast() {
        console.log("pulling data fast")
        setStateFromRoute(setGames, GAME_ENDPOINT)
        setStateFromRoute(setCharacters, CHARACTER_ENDPOINT)    
        setStateFromRoute(setWagers, WAGER_ENDPOINT)
        setStateFromRoute(setItems, ITEM_ENDPOINT)
        setStateFromRoute(setStores, STORE_ENDPOINT)
        setUpdateTimeFast(new Date())
    }
    
    useEffect(() => {
        refDataSlow()
        refDataFast()
      }, []);

    useEffect(() => {
        ws.current = new WebSocket(process.env.WEBSOCKET_ADDRESS || "ws://localhost:9000");
        console.log(ws.current)
        // Opening the ws connection
    
        ws.current.onopen = () => {
          console.log("Connection opened");
          setConnectionOpen(true);
        };
    
        // Listening on ws new added messages
    
        ws.current.onmessage = (event) => {
          console.log(event.data)
          refDataFast()
          refDataSlow()
          //const data = JSON.parse(event.data);
          //console.log(data)
        };
    
        return () => {
          console.log("Cleaning up...");
          ws.current.close();
        };
      }, []);



    const store = {
      randomGameId: randomGameId,
      randomCharacterId: randomCharacterId,
      randomWagerId: randomWagerId,
      randomItemId: randomItemId,
      randomStoreId: randomStoreId,
      games: games,
      characters: characters,
      wagers: wagers,
      items: items,
      stores: stores,
      updateTimeSlow: updateTimeSlow,
      updateTimeFast: updateTimeFast,
      fastTrigger: refDataFast
    }
  
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  }