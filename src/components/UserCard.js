import LinearProgress from "@material-ui/core/LinearProgress";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React from 'react';
import {useAuth0} from "./react-auth0-spa";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: "rgba(0, 0, 0, 0)",
        color: "white"
    }
}));

export default function UserCard() {
    const {isAuthenticated, user, loading, loginWithRedirect} = useAuth0();
    if (loading) return <LinearProgress variant="query" />
    return isAuthenticated ? <UserInformationCard key={"user information card"} user={user} />
        : <Button startIcon={<ExitToAppIcon/>} onClick={loginWithRedirect}>Log in</Button>
}

// The default card for showing basic user information in the sidebar.
export const UserInformationCard = ({user}) => {
    const classes = useStyles();
    return <Box className={classes.header}>
        <CardHeader
            avatar={
                <Avatar aria-label="recipe" className={classes.avatar} src={user.picture} alt="Avatar" />
            }
            title={user.name + ` (${user.nickname})`}
            subheader={user.email}
        />
    </Box>
}
