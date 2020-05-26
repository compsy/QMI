import {useAuth0} from "./react-auth0-spa";
import {Header, TemporaryDrawer, UserInformationCard} from "./TemporaryDrawer";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddBoxIcon from "@material-ui/icons/AddBox";
import TestApiSection from "./TestApiSection";
import React from "react";
import HomeIcon from '@material-ui/icons/Home';
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";



const SET_SHOW_CREATE_QUESTIONNAIRE_PLACEHOLDER = () => {};

export function printt() {
    console.log("Go to landing page");
}

export const GeneralSidebar = ({setShowCreateQuestionnaire = SET_SHOW_CREATE_QUESTIONNAIRE_PLACEHOLDER}) => {
    const {isAuthenticated, loginWithRedirect, logout, user, getIdTokenClaims, loading} = useAuth0();
    function getUserButton() {
        return isAuthenticated ?
                {title: 'Log Out', icon: <ExitToAppIcon/>, onClick: logout}
                : {title: 'Log In', icon: <ExitToAppIcon/>, onClick: loginWithRedirect}
    }

    const getUserCardLayout = () =>{
        return {custom: getUserCard(isAuthenticated, user, loading)};
    };

    const generateLayout = () =>{
        return [
            {custom: <Header key={"header"}/>},
            getUserCardLayout(),
            {isDivider: true},
            // {title: 'Home', icon: <HomeIcon component={Link} to={"/home"}/>, onClick: () => {printt()}, },
            {custom:<Button className={"this"} component={Link} to={"/home"}>Home</Button>},
            {isDivider: true},
            {custom:<Button className={"this"} component={Link} to={"/questions"}>Question</Button>},
            {title: 'Create New Questionnaire', icon: <AddBoxIcon/>, onClick: () => {setShowCreateQuestionnaire(true)}},
            {isDivider: true},
            getUserButton(),
            {isDivider: true},
            {custom: <TestApiSection key={"TestApi"} getIdTokenClaims={getIdTokenClaims}/>}
        ];
    };
    return <TemporaryDrawer layout={generateLayout()}/>
};

export function getUserCard(isAuthenticated, user, loading){
    if(loading) return <Box justifyContent="center"><LinearProgress variant="query"/></Box>;
    return isAuthenticated ?  <UserInformationCard key={"user information card"} user={user}/> : <> </>

}

export default GeneralSidebar
