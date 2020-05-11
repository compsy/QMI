import React from "react";
import {useAuth0} from '../react-auth0-spa';
import Button from "@material-ui/core/Button";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";


const NavBar = () => {
    const {isAuthenticated, loginWithRedirect, logout, user} = useAuth0();
    console.log(user);
    return (
        <div>
            {!isAuthenticated && (
                <Button variant="outlined" color="default" onClick={() => loginWithRedirect({})}>Log in</Button>
            )}

            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

            {isAuthenticated && (
                <span>
                    <Link to="/">Home</Link>&nbsp;
                    <Link to="/profile">Profile</Link>
                </span>
            )}
        </div>
    );
};

export default NavBar;
