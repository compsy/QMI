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
        return (
            isAuthenticated ?
                {title: 'Log Out', icon: <ExitToAppIcon/>, onClick: logout}
                : {title: 'Log In', icon: <div data-cy={"Login"}><ExitToAppIcon/></div>, onClick: loginWithRedirect}
        );

    }

    const generateLayout = () =>{
        return [
            {custom: <Header key={"header"}/>},
            {isDivider: true},
            {redirect: "/home", icon: <HomeIcon data-cy="homeIcon"/>, title:"Home"},
            {redirect: "/", icon: <EditIcon data-cy="editIcon"/>, title:"Editor"},
            {isDivider: true},
            getUserButton(),
            {isDivider: true},
            {custom: <TestApiSection key={"TestApi"} getIdTokenClaims={getIdTokenClaims}/>}
        ];
    };
    return <TemporaryDrawer data-cy="openSidebar" layout={generateLayout()}/>
};

export default GeneralSidebar
