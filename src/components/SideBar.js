import {useAuth0} from "./react-auth0-spa";
import {Header, TemporaryDrawer, UserInformationCard} from "./TemporaryDrawer";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import AddBoxIcon from "@material-ui/icons/AddBox";
import TestApi from "./TestApi";
import React from "react";


const SideBar = () => {
    const {isAuthenticated, loginWithRedirect, logout, user, getTokenSilently, getIdTokenClaims} = useAuth0();
    function getUserInformation() {
        return isAuthenticated ? [
                {custom: <UserInformationCard key={"user information card"} user={user}/>},
                {title: 'Log Out', icon: <ExitToAppIcon/>, onClick: logout}
            ] :
            [{title: 'Log In', icon: <ExitToAppIcon/>, onClick: loginWithRedirect}]
    }

    const generateLayout = () =>{
        return [
            {custom: <Header key={"header"}/>},
            {isDivider: true},
            ...getUserInformation(),
            {custom: <h3 key={"nothing works here header"}>Nothing works here.</h3>},
            {isDivider: true},
            {
                title: 'Profile', icon: <PersonIcon/>, onClick: () => {
                    console.log("clicked")
                }
            },
            {title: 'Create New Questionnaire', icon: <AddBoxIcon/>, onClick: () => {}
            },
            {isDivider: true},
            //{title: 'Test API', icon: <DeveloperBoardIcon/>, onClick: () => {testApi(user);}}
            {custom: <TestApi key={"TestApi"} getTokenSilently={getTokenSilently} getIdTokenClaims={getIdTokenClaims}/>}
        ];
    };
    return <TemporaryDrawer layout={generateLayout(user)}/>
};

export default SideBar
