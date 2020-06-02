import LinearProgress from "@material-ui/core/LinearProgress";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {UserInformationCard} from "./components/TemporaryDrawer";
import React from 'react';
import {useAuth0} from "./components/react-auth0-spa";
import Button from "@material-ui/core/Button";

export default function IconUser() {
    return (
        <div>
            {GetUserCard()}
        </div>
    );
}

function GetUserCard() {
    const {isAuthenticated, user, loading, loginWithRedirect} = useAuth0();
    if (loading) return <div key="loading-icon" justifyContent="center"><LinearProgress variant="query"/></div>
    return isAuthenticated ? <UserInformationCard key={"user information card"} user={user}/>
        : <Button startIcon={<ExitToAppIcon/>} onClick={loginWithRedirect}>Log in</Button>
}