import {React, createContext, useEffect, useRef, useState} from 'react'
import { RANDOM_GAME_ENDPOINT, GAME_ENDPOINT, CREATE_GAME_ENDPOINT, SOCKET_ADDRESS, 
    CHARACTER_ENDPOINT, CREATE_CHARACTER_ENDPOINT, WAGER_ENDPOINT, CREATE_WAGER_ENDPOINT} from "../api/Endpoints";
import { PostData, GetData } from '../api/PostOffice';
import { getActiveGameId } from './Keys';


export const StoreContext = createContext(null)

export default ({ children }) => {
    const active_game_id = getActiveGameId()

    const game_id_dict = {game_id: active_game_id}
    const [randomGame, setRandomGame] = useState(null)
    const [gameIds, setGameIds] = useState([])
    const [characters, setCharacters] = useState([])
    const [wagers, setWagers] = useState([])

    const [connectionOpen, setConnectionOpen] = useState(false);
    const ws = useRef();
    const websocketEndpointDict = {
        [CREATE_GAME_ENDPOINT]: GAME_ENDPOINT,
        [CREATE_CHARACTER_ENDPOINT]: CHARACTER_ENDPOINT,
        [CREATE_WAGER_ENDPOINT]: WAGER_ENDPOINT
    }

    const websocketSetterDict = {
        [GAME_ENDPOINT]: setGameIds,
        [CHARACTER_ENDPOINT]: setCharacters,
        [WAGER_ENDPOINT]: setWagers
    }

    const contentsDict = {
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
        setStateFromRoute(setRandomGame, RANDOM_GAME_ENDPOINT)
        setStateFromRoute(setGameIds, GAME_ENDPOINT)
        setStateFromRoute(setCharacters, CHARACTER_ENDPOINT)
        setStateFromRoute(setWagers, WAGER_ENDPOINT)
        };
        
        ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const fromPath = data.path
        const toPath = websocketEndpointDict[fromPath]
        if (toPath) {
            console.log(fromPath)
            console.log(toPath)
            const setter = websocketSetterDict[toPath]
            setStateFromRoute(setter, toPath)
        }};

        return () => {
        if (connectionOpen) {
            console.log("Cleaning up...");
            ws.current.close();
            setConnectionOpen(false)
        }};}, []);

    const store = {
      randomGame: randomGame,
      gameIds: gameIds,
      characters: characters,
      wagers: wagers
    }
  
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  }