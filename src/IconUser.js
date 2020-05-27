import LinearProgress from "@material-ui/core/LinearProgress";
import {UserInformationCard} from "./components/TemporaryDrawer";
import React from 'react';
import {useAuth0} from "./components/react-auth0-spa";

export default function IconUser() {
    return (
        <div>
            {GetUserCard()}
        </div>
    );
}

function GetUserCard() {
    const {isAuthenticated, user, loading} = useAuth0();
    if (loading) return <div key="loading-icon" justifyContent="center"><LinearProgress variant="query"/></div>
    return isAuthenticated ? <UserInformationCard key={"user information card"} user={user}/>
        : <> </>
}