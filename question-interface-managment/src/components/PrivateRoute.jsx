import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => {
    const currentUser = localStorage.getItem("user");
    if (!currentUser) {
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>;
    }
    return <Component {...props} {...rest}/>;
  }}/>
);

export default PrivateRoute;