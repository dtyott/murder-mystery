import { POST_REQUEST_OPTIONS_BASE, GET_REQUEST_OPTIONS_BASE} from "./Params";

function SendREST(endpoint, options, setter = (x)=>null) {
     fetch(endpoint, options)
    .then(response=> {
        const json = response.json()
        //console.log(json)
        //console.log(response)
        return json
    })
    .then(json => {
        //console.log(json)
        setter(json)
    })
    .catch(err => console.log('There was an error:' + err))
}

export function PostMessage(endpoint, contents){
    const requestOptions = POST_REQUEST_OPTIONS_BASE
    requestOptions['body'] = JSON.stringify(contents)
    SendREST(endpoint, requestOptions)
}

export function GetData(endpoint, setter){
   
    const requestOptions = GET_REQUEST_OPTIONS_BASE
    SendREST(endpoint, requestOptions, setter)
}