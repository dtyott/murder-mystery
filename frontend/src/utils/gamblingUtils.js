

export function getWagersForCharacter(wagers, character) {
    const char_id = character.id
    return wagers.filter((w)=>{
       return (w.char1_id == char_id) || (w.char2_id == char_id) 
    })
}

export function getOutstandingWagerRisk(wagers, character) {
    const myWagers = getWagersForCharacter(wagers, character)
    return myWagers.map(w => w.amount).reduce((a,b)=> a+b,0)
}

export function getActiveWagers(wagers) {
    return wagers.filter(w=>w.active)
}

export function getAcceptedWagers(wagers) {
    return wagers.filter(w=>w.accepted)
}

function getCharacterFromId(char_id, characters) {
    const matches = characters.filter(c=>c.id ==char_id)
    return matches.length>0? matches[0]: null 
}

function getCharacterNameFromId(char_id, characters) {
    const character = getCharacterFromId(char_id, characters)
    
    return character? character.name: null
}

export function formatWagerForCharacter(wager, character, characters) { 
    const isChar1 = character.id == wager.char1_id
    const youString = "(You)"
    const char1_name = getCharacterNameFromId(wager.char1_id, characters)
    const char2_name = getCharacterNameFromId(wager.char2_id, characters)
    return char1_name + (isChar1?youString:"") +  " bets " + char2_name + (isChar1?"":youString) + " $" + wager.amount + " for " + wager.message + "."
}