import LinearProgress from "@material-ui/core/LinearProgress";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {UserInformationCard} from "./components/LeftMenuBarBlueprint";
import React from 'react';
import {useAuth0} from "./components/react-auth0-spa";
import Button from "@material-ui/core/Button";

export default function UserInformation() {
    return (
        <div>
            <UserCard/>
        </div>
    );
}

function UserCard() {
    const {isAuthenticated, user, loading, loginWithRedirect} = useAuth0();
    if (loading) return <div key="loading-icon"><LinearProgress variant="query"/></div>
    return isAuthenticated ? <UserInformationCard key={"user information card"} user={user}/>
        : <Button startIcon={<ExitToAppIcon/>} onClick={loginWithRedirect}>Log in</Button>
}
