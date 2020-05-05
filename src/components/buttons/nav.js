import React from "react";
import { useAuth0 } from '../react-auth0-spa';
import Button from "@material-ui/core/Button";

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div>
            {!isAuthenticated && (
                <Button variant="outlined" color="default" onClick={() => loginWithRedirect({})}>Log in</Button>
            )}

            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
        </div>
    );
};

export default NavBar;
