import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import ButtonAppBar from './ButtonAppBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import history from './history';


const useStyles = makeStyles(theme => ({
  container: {
    // background: 'grey'
  },
  root: {
    width: '360px',
    // position form in the middle
    position: 'absolute', 
    left: '50%', 
    top: '50%',
    transform: 'translate(-50%, -50%)',
    // background: 'grey'
  }
}));

export default function UserHome() {

  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <ButtonAppBar />
      <UserMenu />
    </Container>
  );

}

const UserMenu = (props) => {
  const classes = useStyles();

  const handleClick = (e) => {
    console.log("clicked");
    history.push('/questionnaires');
    window.location.reload();
  }

  return (
    <List component="nav" className={classes.root} aria-label="home">
      <Divider />
      <ListItem button onClick={handleClick}>
        <ListItemText primary="my questionnaires" />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemText primary="my students" />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemText primary="my protocol subscriptions" />
      </ListItem>
      <Divider />
    </List>
  );
}