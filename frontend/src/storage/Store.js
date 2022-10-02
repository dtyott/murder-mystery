import {React, createContext, useEffect, useRef, useState} from 'react'
import { RANDOM_GAME_ENDPOINT, RANDOM_CHARACTER_ENDPOINT, RANDOM_WAGER_ENDPOINT, RANDOM_ITEM_ENDPOINT, RANDOM_STORE_ENDPOINT,
GAME_ENDPOINT, CHARACTER_ENDPOINT, WAGER_ENDPOINT, ITEM_ENDPOINT, STORE_ENDPOINT,
CREATE_GAME_ENDPOINT, CREATE_CHARACTER_ENDPOINT, CREATE_WAGER_ENDPOINT, CREATE_ITEM_ENDPOINT, CREATE_STORE_ENDPOINT,
SOCKET_ADDRESS,UPDATE_WAGER_ENDPOINT,UPDATE_GAME_ENDPOINT,UPDATE_CHARACTER_ENDPOINT,
GAME_ENDPOINTS, CHARACTER_ENDPOINTS, WAGER_ENDPOINTS, ITEM_ENDPOINTS, STORE_ENDPOINTS, UPDATE_ITEM_ENDPOINT, UPDATE_STORE_ENDPOINT
} from "../api/Endpoints";
import { PostData, GetData } from '../api/PostOffice';
import { getActiveGameId} from './Keys';


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

    const [connectionOpen, setConnectionOpen] = useState(false);
    const ws = useRef();

    const websocketEndpointDict = {
        [CREATE_GAME_ENDPOINT]: GAME_ENDPOINTS.concat(STORE_ENDPOINTS),
        [CREATE_CHARACTER_ENDPOINT]: CHARACTER_ENDPOINTS,
        [CREATE_WAGER_ENDPOINT]: WAGER_ENDPOINTS,
        [CREATE_ITEM_ENDPOINT]: ITEM_ENDPOINTS,
        [CREATE_STORE_ENDPOINT]: STORE_ENDPOINTS,
        [UPDATE_GAME_ENDPOINT]: GAME_ENDPOINTS,
        [UPDATE_CHARACTER_ENDPOINT]: CHARACTER_ENDPOINTS,
        [UPDATE_WAGER_ENDPOINT]: WAGER_ENDPOINTS.concat(CHARACTER_ENDPOINTS),
        [UPDATE_ITEM_ENDPOINT]: ITEM_ENDPOINTS,
        [UPDATE_STORE_ENDPOINT]: STORE_ENDPOINTS
    }

    const endpointToSetter = {
        [GAME_ENDPOINT]: setGames,
        [CHARACTER_ENDPOINT]: setCharacters,
        [WAGER_ENDPOINT]: setWagers,
        [ITEM_ENDPOINT]: setItems,
        [STORE_ENDPOINT]: setStores,
        [RANDOM_GAME_ENDPOINT]: setRandomGameId,
        [RANDOM_CHARACTER_ENDPOINT]: setRandomCharacterId,
        [RANDOM_WAGER_ENDPOINT]: setRandomWagerId,
        [RANDOM_ITEM_ENDPOINT]: setRandomItemId,
        [RANDOM_STORE_ENDPOINT]: setRandomStoreId,
    }

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
    
    useEffect(() => {
        ws.current = new WebSocket(SOCKET_ADDRESS);
        ws.current.onopen = () => {
        console.log("Connection opened");
        setConnectionOpen(true);
        setStateFromRoute(setRandomGameId, RANDOM_GAME_ENDPOINT)
        setStateFromRoute(setRandomCharacterId, RANDOM_CHARACTER_ENDPOINT)
        setStateFromRoute(setRandomWagerId, RANDOM_WAGER_ENDPOINT)
        setStateFromRoute(setRandomItemId, RANDOM_ITEM_ENDPOINT)
        setStateFromRoute(setRandomStoreId, RANDOM_STORE_ENDPOINT)
        setStateFromRoute(setGames, GAME_ENDPOINT)
        setStateFromRoute(setCharacters, CHARACTER_ENDPOINT)    
        setStateFromRoute(setWagers, WAGER_ENDPOINT)
        setStateFromRoute(setItems, ITEM_ENDPOINT)
        setStateFromRoute(setStores, STORE_ENDPOINT)
    };
        
        ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const fromPath = data.path
        console.log(fromPath)
        const toPaths = websocketEndpointDict[fromPath]
        console.log(toPaths)
        toPaths.forEach(path =>{
            const setter = endpointToSetter[path]
            if (setter) {
                setStateFromRoute(setter, path)
            }
        })}

        return () => {
        if (connectionOpen) {
            console.log("Cleaning up...");
            ws.current.close();
            setConnectionOpen(false)
        }};}, []);

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
      stores: stores
    }
  
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  }