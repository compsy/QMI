import Button from "@material-ui/core/Button";
import React from "react";
import {auth_config} from "../features/API/auth_config";


function TestApiSection({getIdTokenClaims}){

    const handleBadRequest = (response) => {
        console.log("Bad request");
        Object.keys(response.body.result).forEach(key => console.log(key + " " + response.body.result[key]));

    }

    const handleSuccess = (response) => {
        console.log("Success!");
    }

    const responseHandlers = {
        400: handleBadRequest,
        201: handleSuccess,

    }

    const createNewQuestionnaireAsync = async (questionnaire) =>{
        const itc = await getIdTokenClaims();
        const unirest = require('unirest');
        const req = unirest('POST', auth_config.base + '/api/v1/questionnaire')
            .headers({
                'Authorization': 'Bearer ' + itc.__raw,
                'Content-Type': 'application/json'
            })
            .send(JSON.stringify({questionnaire: questionnaire}))
            .end(function (res) {
                console.log(res.code);
                responseHandlers[res.code](res);
            });

    }

    const callApi = async () =>{
        const questionnaire = {
            name: "teest",
            content: {},
            key: "teest",
            title: "test"
        }
        await createNewQuestionnaireAsync(questionnaire);
    }
    return <>
        <h1>Api Test</h1>
        <Button onClick={callApi}>Ping API</Button>
    </>
}

export default TestApiSection;
