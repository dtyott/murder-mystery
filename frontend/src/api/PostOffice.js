import { POST_REQUEST_OPTIONS_BASE, GET_REQUEST_OPTIONS_BASE} from "./Params";

function SendREST(endpoint, options, setter) {
    //console.log(options)
     fetch(endpoint, options)
    .then(response=> {
        const json = response.json()
    //    console.log(json)
    //    console.log(response)
        return json
    })
    .then(json => {
    //    console.log(json)
        setter(json)
        //return json
    })
    .catch(err => console.log('There was an error:' + err))
}

export function PostData(endpoint, contents, setter = (x)=>null){
    const requestOptions = POST_REQUEST_OPTIONS_BASE
    requestOptions['body'] = JSON.stringify(contents)
    SendREST(endpoint, requestOptions, setter)
}

export function GetData(endpoint, setter){
   
    const requestOptions = GET_REQUEST_OPTIONS_BASE
    SendREST(endpoint, requestOptions, setter)
}