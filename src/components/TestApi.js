import config from "../auth_config";
import Button from "@material-ui/core/Button";
import React from "react";
import {useAuth0} from "./react-auth0-spa";

//const {getTokenSilently, getIdTokenClaims} = useAuth0();
function TestApi({getTokenSilently, getIdTokenClaims}){

    const callApi = async () =>{
        const request = require("request");
        const token = await getTokenSilently();

        console.log(btoa("MIIDCzCCAfOgAwIBAgIJSVbsDO/vXlo3MA0GCSqGSIb3DQEBCwUAMCMxITAfBgNV\n" +
            "BAMTGGthbmFkZXYtZGV2LmV1LmF1dGgwLmNvbTAeFw0yMDA1MTExNDM2MDVaFw0z\n" +
            "NDAxMTgxNDM2MDVaMCMxITAfBgNVBAMTGGthbmFkZXYtZGV2LmV1LmF1dGgwLmNv\n" +
            "bTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALUxqmClqHMoBQd5YYyq\n" +
            "1cHFX0/LBwXGiZ0eMMe8GC1FHILwgipaWBVhVL/TrIgBylxdjoIb4bsNdldGwZtP\n" +
            "XB1bsg7ku3x32nhHIaPHAme5kzL/liHPINzBqJVNKHQ2I5cmD3OIjvmCkXcMi+aR\n" +
            "bIMoS1UFR0XvpmWQbqIjV7R4C5jHJMjczy9WKLIpAvjhyAMQzUi1HAYRxEOYMAe+\n" +
            "oegEMG9aXRz3T259h4CBluCA0JrO3XLRdAMO9c5JyrTh76epcumVs/KEbhalyHaQ\n" +
            "nv0XRf+Xea0iHrhzFOGaVDg2J3+ln9Gkig6EikBAelkM9toEDHUQSVCln2+EvvPX\n" +
            "IiMCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQULUYfGBJSFNtY\n" +
            "Gu8e9u5sE6jh6WkwDgYDVR0PAQH/BAQDAgKEMA0GCSqGSIb3DQEBCwUAA4IBAQBm\n" +
            "bSbcclEMzuM3e9uyaE+iqmax7r6NRCwJzeroxOMeZ7Hfd5Xj4LMWMqV1UWTw3n0C\n" +
            "e2rsOKO4dditrt6Xd/Kx9dxeypCg31cBVNFMYwpF3s8C2Fy/rK5H9Y7O1g5pf24D\n" +
            "olZxkZKtjnBIyGE8WbzceLJ8j/38PJMrujD56laU/Cmcxcmo2ZG5/TIORkxXrU8N\n" +
            "p1tLqAX4MDUewIdaidGvJdwc6ORJYnQ23q3MTF1GlGV49MPAXNGKZJyXEWIgAG2C\n" +
            "RGc0OUU+Ou3sCjCo736SUtwYIi8W/4T1KiMILn2vmxrnzPYaJgZu0TueTgqhcREW\n" +
            "t+cGoPh5WwVQwu9FDE3D"));

        console.log(token);
        const options = {
            method: 'GET',
            url: config.base + "/api/v1/person/me",
            headers: {
                authorization:
                    `Bearer ${token}`
            }
        };

        // request(options, function (error, response, body) {
        //     if (error) throw new Error(error);
        //
        //     console.log(body);
        // });

    };

    return <>
        <h1>Api Test</h1>
        <Button onClick={callApi}>Ping API</Button>
    </>
}
export default TestApi;
