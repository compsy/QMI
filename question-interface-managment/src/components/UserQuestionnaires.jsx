import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import LoginForm from './LoginForm';
import ButtonAppBar from './ButtonAppBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import StickyHeadTable from './StickyHeadTable';

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
  },
  table: {
    // position form in the middle
    position: 'absolute', 
    left: '50%', 
    top: '50%',
    transform: 'translate(-50%, -50%)',
    // background: 'grey'
  }
}));

export default function UserQuestionnaires() {

  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="false">
      <ButtonAppBar />
      {/* <QuestionnairesMenu /> */}
      <Container className={classes.table} maxWidth="md">
        <StickyHeadTable />
      </Container>
    </Container>
  );

}

const QuestionnairesMenu = (props) => {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="home">
      <Divider />
      <ListItem button>
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