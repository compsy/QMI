// Api statuses should be used in combination with a holder for the response body. It connects the process of an api
// call to the result that should be rendered.
export const API_STATUS = {
    INIT: 'init', // initial value, after the component has been mounted.
    IDLE: 'idle', //
    LOADING: 'loading', // api call is being processed
    NOT_AUTHENTICATED : 'not authenticated',
    ERROR: 'error' // an error has occurred in the api call
}

// additional error catcher for errors that have custom messages
export const handleRequestResponse = (response) => {
    if(response.hasOwnProperty('result') && response.result === 'User is not an admin'){
        return {status: API_STATUS.ERROR, body: response.body}
    }
    return {status: API_STATUS.IDLE, body: response.body}
}

export const generateRequestCallAndExec = (isAuthenticated, promise, stateSetter, nullValue = null) =>{
    console.log(promise);
    if(!isAuthenticated){
        return;
    }
    stateSetter({status: API_STATUS.LOADING, body: nullValue})
    promise
        .catch(error => stateSetter({status: API_STATUS.ERROR, body: error.body}))
        .then(response => {
            stateSetter(handleRequestResponse(response));
        })
    console.log("test");
}


export const ERROR_MESSAGES = {
    404: "The page has not been found",
}