const { pool } = require('./config');
const constants = require('./constants')
const utils = require('./utils')


const postprocessCreate = (request, response, pool) => {
    const params = request.params
    const body = request.body
    const model_name = params.model
    if (model_name == 'games') {
        const store_model = 'stores'
        constants.STORE_DEFAULTS.forEach(item=>{
            item.game_id = body.game_id
            item.id = `${body.game_id}_${item.item_name}`
            const queryString = `INSERT INTO ${store_model} ${utils.makeQueryStringFromDict(item)} RETURNING *`
            utils.dbQuery(pool, queryString) 
        })

    }
}


module.exports = {
    postprocessCreate
}