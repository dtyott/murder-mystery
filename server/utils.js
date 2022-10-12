function makeid(length) {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

function getRandomId(length, exclusions) {
    const id = makeid(length)
    return exclusions.includes(id)? getRandomId(length, exclusions): id

}

function makeQueryStringFromDict(dict) {
    const keys = Object.keys(dict)
    const values = keys.map(k=>`'${dict[k]}'`)
    const keyString = keys.join(", ")
    const valueString = values.join(", ")
    const queryString = `(${keyString}) VALUES (${valueString})`
    return queryString

}

function dbQuery(pool, queryString, response=null) {
    console.log(`executing ${queryString}`)
    pool.query(queryString, (error, results) =>{
        if (error) {
            throw error
        }
        response?response.status(200).json(results.rows):null
        console.log(`${queryString} executed successfully`)
    })
}

module.exports = {
    getRandomId,
    makeQueryStringFromDict,
    dbQuery
}