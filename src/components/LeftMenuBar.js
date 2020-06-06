import {useAuth0} from "./react-auth0-spa";
import {Header, LeftMenuBarBlueprint} from "./LeftMenuBarBlueprint";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React from "react";
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import Grid from "@material-ui/core/Grid";
import {ModeToggle} from "../ModeToggle";


export const LeftMenuBar = ({themeConfig, toggleDarkMode}) => {
    const {isAuthenticated, loginWithRedirect, logout} = useAuth0();

    function getUserButton() {
        return (
            isAuthenticated ?
                {title: 'Log Out', icon: <ExitToAppIcon/>, onClick: logout}
                : {title: 'Log In', icon: <div data-cy={"Login"}><ExitToAppIcon/></div>, onClick: loginWithRedirect}
        );
    }

    const ModeSwitcher = () => {
        return <Grid
            container
            direction="row"
            alignItems="center"
            justify="center"
            spacing={1}
        >
            <Grid item>Light Mode</Grid>
            <Grid item>
                <ModeToggle data-cy="darkModeSwitcher" mode={themeConfig.palette.type}
                            checked={themeConfig.palette.type === "dark"} onChange={toggleDarkMode} value="checkedC"/>
            </Grid>
            <Grid item>Dark Mode</Grid>
        </Grid>

    }

    const generateLayout = () => {
        return [
            {custom: <Header key={"header"}/>},
            {isDivider: true},
            {redirect: "/home", icon: <HomeIcon data-cy="homeIcon"/>, title: "Home"},
            {redirect: "/", icon: <EditIcon data-cy="editIcon"/>, title: "Editor"},
            {isDivider: true},
            getUserButton(),
            {isDivider: true},
            {customWrapped: <ModeSwitcher/>},
            {isDivider: true},

        ];
    };
    return <LeftMenuBarBlueprint data-cy="openSidebar" layout={generateLayout()}/>
};

export default LeftMenuBar
