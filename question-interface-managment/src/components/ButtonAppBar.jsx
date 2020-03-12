import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { fade } from '@material-ui/core/styles/colorManipulator';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import history from './history';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  // appbar: {
  //   backgroundColor: 'rgba(63, 81, 181, 0.8)',
  // },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const handleLogoutClick = (e) => {
    console.log("logging out now");
    localStorage.clear();
    history.push('/');
    window.location.reload();
  }

  const handleBackClick = (e) => {
    console.log(window.location.href);
    if (window.location.href == 'http://localhost:3000/') {
      localStorage.clear();
    }
    history.goBack();
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleBackClick}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            QMI
          </Typography>
          <Button color="inherit" onClick={handleLogoutClick}>signout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}