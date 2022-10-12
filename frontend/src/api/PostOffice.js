import { POST_REQUEST_OPTIONS_BASE, GET_REQUEST_OPTIONS_BASE, PUT_REQUEST_OPTIONS_BASE} from "./Params";

function SendREST(endpoint, options, setter, contents) {
    if (contents) {
        options['body'] = JSON.stringify(contents)
    }
    //console.log(options)
    //console.log(endpoint)
    //const urlStart = process.env.REACT_APP_SERVER_URL == 'localhost:5000'? 'http://':'https://'
    //const serverUrl = urlStart+ process.env.REACT_APP_SERVER_URL
    //console.log(serverUrl)
    fetch(endpoint, options)
    .then(response=> {
        const json = response.json()
        return json
    })
    .then(json => {
        setter(json)
    })
    .catch(err => console.log('There was an error:' + err))
}

export function PostData(endpoint, contents, setter = (x) => null){
    const requestOptions = POST_REQUEST_OPTIONS_BASE
    SendREST(endpoint, requestOptions, setter, contents)
}

export function UpdateData(endpoint, contents, setter = (x) => null) {
    const requestOptions = PUT_REQUEST_OPTIONS_BASE
    SendREST(endpoint, requestOptions, setter, contents)
}

export function GetData(endpoint, contents=null, setter = (x)=> null){
    const requestOptions = GET_REQUEST_OPTIONS_BASE
    SendREST(endpoint, requestOptions, setter, contents)
}

