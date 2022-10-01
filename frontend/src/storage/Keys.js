const id_base = "murder_mystery"
const game_id_key = id_base + "_active_game_id"

function makeKey(attribute,game_id) {
    return [id_base,attribute,game_id].join("_")
}

export function setActiveGameId(game_id) {
    localStorage.setItem(game_id_key, game_id)
}

export function getActiveGameId() {
    return localStorage.getItem(game_id_key)
}

export function setAttributeForGame(attribute, game_id, val) {

    localStorage.setItem(makeKey(attribute, game_id), val)
}

export function getAttributeForGame(attribute, game_id) {
    return localStorage.getItem(makeKey(attribute, game_id))
}