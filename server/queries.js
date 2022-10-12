const  utils = require('./utils');
const { pool } = require('./config');
const postprocess = require('./postprocess')
const server = require('./socket')

const getModels = (request, response) => {
    const params = request.params
    const model_name = params.model
    const queryString = `SELECT * from ${model_name} ORDER BY id ASC`
    utils.dbQuery(pool, queryString, response)
}

const createModels = (request, response) => {
    const params = request.params
    const body = request.body
    const model_name = params.model
    const queryString = `INSERT INTO ${model_name} ${utils.makeQueryStringFromDict(body)} RETURNING *`
    utils.dbQuery(pool, queryString, response)
    postprocess.postprocessCreate(request, response, pool)
    server.broadcast(model_name)
}

const getIdForModel = (request, response) => {
    const params = request.params
    const model_name = params.model
    pool.query('SELECT id FROM ' + model_name, (error, results) =>{
        if (error) {
            throw error
        }
        const rows = results.rows
        const id = utils.getRandomId(5, rows)
        const res = {'id': id}
        response.status(200).json(res)
    })
}

const defaultRoute = (request, response) => {
    response.status(200).json({'message':'Welcome to the Danger Zone.'})
}


module.exports = {
    createModels,
    defaultRoute,
    getModels,
    getIdForModel
}