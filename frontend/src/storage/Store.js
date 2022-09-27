import {React, createContext, useEffect, useRef, useState} from 'react'
import { RANDOM_GAME_ENDPOINT, RANDOM_CHARACTER_ENDPOINT, RANDOM_WAGER_ENDPOINT,
GAME_ENDPOINT, CHARACTER_ENDPOINT, WAGER_ENDPOINT,
CREATE_GAME_ENDPOINT, CREATE_CHARACTER_ENDPOINT, CREATE_WAGER_ENDPOINT,
SOCKET_ADDRESS,UPDATE_WAGER_ENDPOINT,UPDATE_GAME_ENDPOINT,UPDATE_CHARACTER_ENDPOINT
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
    const [games, setGames] = useState([])
    const [characters, setCharacters] = useState([])
    const [wagers, setWagers] = useState([])

    const [connectionOpen, setConnectionOpen] = useState(false);
    const ws = useRef();
    const websocketEndpointDict = {
        [CREATE_GAME_ENDPOINT]: GAME_ENDPOINT,
        [CREATE_CHARACTER_ENDPOINT]: CHARACTER_ENDPOINT,
        [CREATE_WAGER_ENDPOINT]: WAGER_ENDPOINT,
        [UPDATE_GAME_ENDPOINT]: GAME_ENDPOINT,
        [UPDATE_CHARACTER_ENDPOINT]: CHARACTER_ENDPOINT,
        [UPDATE_WAGER_ENDPOINT]: WAGER_ENDPOINT
    }

    const websocketSetterDict = {
        [GAME_ENDPOINT]: [{setter:setGames, endpoint:GAME_ENDPOINT}, {setter:setRandomGameId, endpoint:RANDOM_GAME_ENDPOINT}],
        [CHARACTER_ENDPOINT]: [{setter:setCharacters, endpoint:CHARACTER_ENDPOINT}, {setter:setRandomCharacterId, endpoint: RANDOM_CHARACTER_ENDPOINT}],
        [WAGER_ENDPOINT]: [{setter:setWagers, endpoint:WAGER_ENDPOINT}, {setter:setRandomWagerId, endpoint: RANDOM_WAGER_ENDPOINT}],
        [UPDATE_GAME_ENDPOINT]: [{setter:setGames, endpoint:GAME_ENDPOINT}],
        [UPDATE_CHARACTER_ENDPOINT]: [{setter:setCharacters, endpoint:CHARACTER_ENDPOINT}],
        [UPDATE_WAGER_ENDPOINT]: [{setter:setWagers, endpoint:WAGER_ENDPOINT}]
    
    }

    const contentsDict = {
        [GAME_ENDPOINT]: {},
        [CHARACTER_ENDPOINT]: game_id_dict,
        [WAGER_ENDPOINT]: game_id_dict
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
        setStateFromRoute(setGames, GAME_ENDPOINT)
        setStateFromRoute(setCharacters, CHARACTER_ENDPOINT)
        setStateFromRoute(setWagers, WAGER_ENDPOINT)
        };
        
        ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const fromPath = data.path
        const toPath = websocketEndpointDict[fromPath]
        if (toPath) {
        
            const setters = websocketSetterDict[toPath]
            setters.forEach((dict)=>{
                setStateFromRoute(dict.setter, dict.endpoint)
            })
        }};

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
      games: games,
      characters: characters,
      wagers: wagers
    }
  
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  }