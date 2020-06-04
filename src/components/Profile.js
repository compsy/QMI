import React, {Fragment} from "react";
import {useAuth0} from "./react-auth0-spa"

const Profile = () => {
    const {loading, user} = useAuth0();

    if (loading || !user) {
        return <div>Loading...</div>;
    }

    return (
        <Fragment>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </Fragment>
    );
};

export default Profile;
