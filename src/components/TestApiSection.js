import Button from "@material-ui/core/Button";
import React from "react";


function TestApiSection({getIdTokenClaims}){
    const callCreateQuestionnaire = (token) => {
        const emptyQuestionnaire = {
            name: "string",
            content: {},
            key: "string",
            title: "string"
        }
        const unirest = require('unirest');
        unirest('GET', 'http://localhost:3002/api/v1/person/me')
            .headers({
                'Content-Type': ['application/json', 'text/plain'],
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            })
            //.send(JSON.stringify(emptyQuestionnaire))
            .end(function (res) {
                if (res.error) throw new Error(res.error);
                console.log(res.body);
            });
    }

    const getAllQuestionnaires = async () => {
        const itc = await getIdTokenClaims();
        console.log(itc.__raw);
        let questionnaires = {};
        const unirest = require('unirest');
        return unirest('GET', "http://localhost:3002" + '/api/v1/questionnaire')
            .headers({
                'Authorization': `Bearer ${itc.__raw}`
            })
    }

    const callApi = async () =>{

        const questionnairesPromise = getAllQuestionnaires();
        console.log(questionnairesPromise);
        questionnairesPromise
            .then(function (res) {
            if (res.error) throw new Error(res.error);
            console.table(res.body);
        });

    }
    return <>
        <h1>Api Test</h1>
        <Button onClick={callApi}>Ping API</Button>
    </>
}

export default TestApiSection;
