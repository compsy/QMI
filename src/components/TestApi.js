import config from "../auth_config";
import Button from "@material-ui/core/Button";
import React from "react";
import {useAuth0} from "./react-auth0-spa";

//const {getTokenSilently, getIdTokenClaims} = useAuth0();
function TestApi({getIdTokenClaims}){
    const callCreateQuestionnaire = (token) => {
        const emptyQuestionnaire = {
            name: "string",
            content: {},
            key: "string",
            title: "string"
        }
        const unirest = require('unirest');
        unirest('POST', 'http://localhost:3002/api/v1/questionnaire')
            .headers({
                'Content-Type': ['application/json', 'text/plain'],
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            })
            .send(JSON.stringify(emptyQuestionnaire))
            .end(function (res) {
                if (res.error) throw new Error(res.error);
                console.log(res.response);
            });
    }

    const callApi = async () =>{
        const itc = await getIdTokenClaims();
        const token = itc.__raw;
        callCreateQuestionnaire(token);
    }
    return <>
        <h1>Api Test</h1>
        <Button onClick={callApi}>Ping API</Button>
    </>
}

export default TestApi;
