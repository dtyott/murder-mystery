const default_headers =  {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

export const POST_REQUEST_OPTIONS_BASE = {
    method: 'POST',
    headers: default_headers
}

export const PUT_REQUEST_OPTIONS_BASE = {
    method: 'PUT',
    headers: default_headers
}

export const GET_REQUEST_OPTIONS_BASE = {
    method: 'GET'
}