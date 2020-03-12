import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import history from "./history";

const users = [
  { username: "john", password: "lennon", questionnaires: [] },
  { username: "paul", password: "mccartney", questionnaires: [] },
  { username: "ringo", password: "starr", questionnaires: [] }
];

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    },
    // position form in the middle
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    // background: 'grey'
    textAlign: "center"
  },
  element: {
    margin: "10px"
  }
}));

const LoginForm = props => {
  const classes = useStyles();

  const handleLoginSubmit = e => {
    e.preventDefault();
    const xs = users.map(user => {
      return user.username === e.target.elements["username"].value &&
        user.password === e.target.elements["password"].value
        ? true
        : false;
    });
    const orReducer = (acc, item) => {
      return acc || item;
    };
    const check = xs.reduce(orReducer, false);

    if (check) {
      // this.setState({
      //   showMessage: true,
      //   message: "logged in!",
      //   messageColor: "green-text"
      // });
      // localStorage.setItem("user", "token");
      localStorage.setItem("user", {
        name: "john",
        password: "lennon",
        questionnaires: []
      });
      history.push("/");
      console.log(check);
      window.location.reload();
    } else {
      // this.setState({
      //   showMessage: true,
      //   message: "incorrect username or password",
      //   messageColor: "red-text"
      // });
      console.log(check);
    }
  };

  const handleSignupClick = e => {
    console.log("route to signup page");
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleLoginSubmit}
    >
      <div>
        <TextField
          className={classes.element}
          id="username"
          label="username"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          className={classes.element}
          id="password"
          label="password"
          variant="outlined"
          type="password"
        />
      </div>
      <div>
        <Button
          className={classes.element}
          id="login-button"
          variant="contained"
          color="primary"
          type="submit"
        >
          login
        </Button>
      </div>
      <div>
        <Button
          className={classes.element}
          id="signup-button"
          variant="contained"
          color="secondary"
          onClick={handleSignupClick}
        >
          signup
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
