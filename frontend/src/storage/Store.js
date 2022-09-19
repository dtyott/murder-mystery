import {React, createContext, useEffect, useRef, useState} from 'react'
import { RANDOM_GAME_ENDPOINT, GAME_ENDPOINT, CREATE_GAME_ENDPOINT, SOCKET_ADDRESS} from "../api/Endpoints";
import { GetData } from '../api/PostOffice';


export const StoreContext = createContext(null)

export default ({ children }) => {
    const [randomGame, setRandomGame] = useState(null)
    const [gameIds, setGameIds] = useState([])
    const [connectionOpen, setConnectionOpen] = useState(false);
    const ws = useRef();
    const websocketEndpointDict = {
        [CREATE_GAME_ENDPOINT]: GAME_ENDPOINT
    }

    const websocketSetterDict = {
        [GAME_ENDPOINT]: setGameIds
    }

    function setStateFromRoute(setter, route)  {
        GetData(route, setter) 
    }
    
    useEffect(() => {
        ws.current = new WebSocket(SOCKET_ADDRESS);

        ws.current.onopen = () => {
        console.log("Connection opened");
        setConnectionOpen(true);
        setStateFromRoute(setRandomGame, RANDOM_GAME_ENDPOINT)
        setStateFromRoute(setGameIds, GAME_ENDPOINT)
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
        }
        
        };

        return () => {
        if (connectionOpen) {
            console.log("Cleaning up...");
            ws.current.close();
            setConnectionOpen(false)
        }
        
        };
    }, []);

  
    const store = {
      randomGame: randomGame,
      gameIds: gameIds
    }
  
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  }