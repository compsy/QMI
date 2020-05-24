import {useAuth0} from "./react-auth0-spa";
import {Header, TemporaryDrawer, UserInformationCard} from "./TemporaryDrawer";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddBoxIcon from "@material-ui/icons/AddBox";
import TestApiSection from "./TestApiSection";
import React from "react";
import HomeIcon from '@material-ui/icons/Home';
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";


const SET_SHOW_CREATE_QUESTIONNAIRE_PLACEHOLDER = () => {};

export const GeneralSidebar = ({setShowCreateQuestionnaire = SET_SHOW_CREATE_QUESTIONNAIRE_PLACEHOLDER}) => {
    const {isAuthenticated, loginWithRedirect, logout, user, getIdTokenClaims, loading} = useAuth0();
    function getUserButton() {
        return isAuthenticated ?
                {title: 'Log Out', icon: <ExitToAppIcon/>, onClick: logout}
                : {title: 'Log In', icon: <ExitToAppIcon/>, onClick: loginWithRedirect}
    }

    const getUserCardLayout = () =>{
        return {custom: getUserCard(isAuthenticated, user, loading)};
    }

    const generateLayout = () =>{
        return [
            {custom: <Header key={"header"}/>},
            getUserCardLayout(),
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

export function getUserCard(isAuthenticated, user, loading){
    if(loading) return <Box justifyContent="center"><LinearProgress variant="query"/></Box>
    return isAuthenticated ?  <UserInformationCard key={"user information card"} user={user}/> : <> </>

}

export default GeneralSidebar
