// Api statuses should be used in combination with a holder for the response body. It connects the process of an api
// call to the result that should be rendered.
export const API_STATUS = {
    INIT: 'init', // initial value, after the component has been mounted.
    IDLE: 'idle', //
    LOADING: 'loading', // api call is being processed
    NOT_AUTHENTICATED: 'not authenticated',
    ERROR: 'error' // an error has occurred in the api call
}


export const ERROR_MESSAGES = {
    404: "The page has not been found",
}