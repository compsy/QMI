import {useAuth0} from "./react-auth0-spa";
import {Header, TemporaryDrawer, UserInformationCard} from "./TemporaryDrawer";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddBoxIcon from "@material-ui/icons/AddBox";
import TestApiSection from "./TestApiSection";
import React from "react";
import HomeIcon from '@material-ui/icons/Home';

const GeneralSidebar = ({setShowCreateQuestionnaire}) => {
    const {isAuthenticated, loginWithRedirect, logout, user, getIdTokenClaims} = useAuth0();


    function getUserButton() {
        return isAuthenticated ?
                {title: 'Log Out', icon: <ExitToAppIcon/>, onClick: logout}
                : {title: 'Log In', icon: <ExitToAppIcon/>, onClick: loginWithRedirect}
    }

    function getUserCard() {
        return isAuthenticated ? {custom: <UserInformationCard key={"user information card"} user={user}/>} : {custom: null}
    }

    const generateLayout = () =>{
        return [
            {custom: <Header key={"header"}/>},
            getUserCard(),
            {isDivider: true},
            {title: 'Home', icon: <HomeIcon/>, onClick: () => {console.log("Go to landing page")}},
            {title: 'Create New Questionnaire', icon: <AddBoxIcon/>, onClick: () => {setShowCreateQuestionnaire(true)}},
            {isDivider: true},
            getUserButton(),
            {isDivider: true},
            {custom: <TestApiSection key={"TestApi"} getIdTokenClaims={getIdTokenClaims}/>}
        ];
    };
    return <TemporaryDrawer layout={generateLayout(user)}/>
};

export default GeneralSidebar
