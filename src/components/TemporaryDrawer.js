import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles, Typography} from "@material-ui/core";
import React, {Fragment, useState} from "react";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import PersonIcon from "@material-ui/icons/Person";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
        color: "white"
    },
    drawer: {
        height: "100%",
        backgroundColor: "#00909e",
    },
    header: {
        backgroundColor: "rgba(0, 0, 0, 0)",
        color: "white"
    }
}));

// The default header for a TemporaryDrawer instance. It contains the u-can-act logo and a title.
export const Header = () => {
    const classes = useStyles();
    return <Card className={classes.header}>
        <CardActionArea>
            <CardMedia
                component="img"
                alt="Logo"
                image="U_can_act_logo_WIT_web.png"
            />
            <CardContent>
                <Typography gutterBottom variant="h6">
                    Questionnaire Editor
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
};

/* The left sidebar.
Layouts are strucutred in an array containing JSON objects:
     title: string containing the text of the element
     icon: a valid Material UI icon component
     onClick: a lambda expression containing the click handler for the element*
  Special types:
     {isDivider: true}                  : For adding a divider to the layout
     {custom: <RenderedReactComponent>} : For adding a custom react component or sub-layout.
*/

// Example layout.
const layout = [
    {custom: <Header key={"header"}/>},
    {isDivider: true},
    {custom: <h3>Nothing works here.</h3>},
    {isDivider: true},
    {
        title: 'Profile', icon: <PersonIcon/>, onClick: () => {
            console.log("clicked")
        }
    },
    {
        title: 'Create New Questionnaire', icon: <AddBoxIcon/>, onClick: () => {
        }
    },
    {isDivider: true},
    {
        title: 'Log Out', icon: <ExitToAppIcon/>, onClick: () => {
        }
    },
    {isDivider: true},
    {
        title: 'Edit Dialog Beta', icon: <DeveloperBoardIcon/>, onClick: () => {
        }
    }
];


export const TemporaryDrawer = ({layout}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const renderLayout = () => {
        const renderElement = (element, index) => {
            if (element.hasOwnProperty('isDivider')) {
                return <Divider key={'divider' + index}/>
            } else if (element.hasOwnProperty('custom')) {
                return element.custom;
            }
            return <ListItem button key={element.title + index} onClick={element.onClick}>
                <ListItemIcon>{element.icon}</ListItemIcon>
                <ListItemText primary={element.title}/>
            </ListItem>
        };

        return layout.map((element, index) => renderElement(element, index))
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && event.key === 'Escape') {
            setOpen(false);
            return;
        }
        setOpen(open);
    };

    const list = () => {
        return <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {renderLayout()}
            </List>
        </div>
    };

    return (
        <Fragment key="drawer-left">
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                        onClick={toggleDrawer(true)}
            >
                <MenuIcon/>
            </IconButton>

            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                <div className={classes.drawer}>
                    {list()}
                </div>
            </Drawer>
        </Fragment>
    );
};