import "typeface-montserrat"
import "typeface-merriweather"

import React from "react";
import {navigate} from "gatsby";

import {AuthProvider} from "react-use-auth";

export const wrapRootElement = ({element}) => (
    <AuthProvider
        navigate={navigate}
        auth0_domain="dev-pb8h7vmw.eu.auth0.com"
        auth0_client_id="aLyZq5xlr0asah3iTSqt5mPD5iWhKxmx"
    >
        {element}
    </AuthProvider>
);
