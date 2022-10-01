export const POTENTIAL_CHARACTER_ENDPOINT = '/api/nlp/potential_character';

export const RANDOM_GAME_ENDPOINT = '/api/db/games/new_id';
export const RANDOM_CHARACTER_ENDPOINT = '/api/db/characters/new_id';
export const RANDOM_WAGER_ENDPOINT = '/api/db/wagers/new_id';

export const GAME_ENDPOINT = '/api/db/games';
export const CHARACTER_ENDPOINT = '/api/db/characters';
export const WAGER_ENDPOINT = '/api/db/wagers';

export const CREATE_GAME_ENDPOINT = '/api/db/create/games';
export const CREATE_CHARACTER_ENDPOINT = '/api/db/create/characters';
export const CREATE_WAGER_ENDPOINT = '/api/db/create/wagers';

export const UPDATE_GAME_ENDPOINT = '/api/db/update/games';
export const UPDATE_CHARACTER_ENDPOINT = '/api/db/update/characters';
export const UPDATE_WAGER_ENDPOINT = '/api/db/update/wagers';

export const SOCKET_ADDRESS = 'ws://localhost:8000/websocket';

export const GAME_ENDPOINTS = [GAME_ENDPOINT, CREATE_GAME_ENDPOINT, UPDATE_GAME_ENDPOINT, RANDOM_GAME_ENDPOINT]
export const CHARACTER_ENDPOINTS = [CHARACTER_ENDPOINT, CREATE_CHARACTER_ENDPOINT, UPDATE_CHARACTER_ENDPOINT, RANDOM_CHARACTER_ENDPOINT]
export const WAGER_ENDPOINTS = [WAGER_ENDPOINT, CREATE_WAGER_ENDPOINT, UPDATE_WAGER_ENDPOINT, RANDOM_WAGER_ENDPOINT]
