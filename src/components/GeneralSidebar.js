import {useAuth0} from "./react-auth0-spa";
import {Header, TemporaryDrawer} from "./TemporaryDrawer";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TestApiSection from "./TestApiSection";
import React from "react";
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';

export const GeneralSidebar = () => {
    const {isAuthenticated, loginWithRedirect, logout, user, getIdTokenClaims, loading} = useAuth0();

    function getUserButton() {
        return isAuthenticated ?
                {title: 'Log Out', icon: <ExitToAppIcon/>, onClick: logout}
                : {title: 'Log In', icon: <ExitToAppIcon/>, onClick: loginWithRedirect}
    }

    const generateLayout = () =>{
        return [
            {custom: <Header key={"header"}/>},
            {isDivider: true},
            {redirect: "/home", icon: <HomeIcon/>, title:"Home"},
            {redirect: "/", icon: <EditIcon/>, title:"Editor"},
            {isDivider: true},
            getUserButton(),
            {isDivider: true},
            {custom: <TestApiSection key={"TestApi"} getIdTokenClaims={getIdTokenClaims}/>}
        ];
    };
    return <TemporaryDrawer layout={generateLayout()}/>
};

export default GeneralSidebar
