import React from 'react';
import PrivateRoute from './Private';
import { Switch, Route } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Settings from './Settings';
import Status from './Status';
import Friends from './Friends';
import Requests from './Requests';
import Chat from './Chat';
import People from './People';
import Call from './Call';
import ClearBottom from '../components/ClearBottom';

const styles = theme => ({
  toolbar: theme.mixins.toolbar
})

export default withStyles(styles)(({ classes }) =>
<div className="contain">
  <div className={classes.toolbar} />
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={() => <Login signup />} />
    <PrivateRoute exact path="/settings" component={Settings} />
    <PrivateRoute exact path="/profile/:id" component={Profile} />
    <PrivateRoute exact path="/chat/:id" component={Chat} />
    <PrivateRoute exact path="/status" component={Status} />
    <PrivateRoute exact path="/friends" component={() => <div className="container">
      <Friends className="my-4" />
      <ClearBottom />
    </div>} />
    <PrivateRoute exact path="/requests" component={() => <div className="container">
      <Requests className="my-4" />
      <ClearBottom />
    </div>} />
    <PrivateRoute exact path="/people" component={People} />
    <PrivateRoute exact path="/call" component={Call} />
    <Route path="*" component={Home} />
  </Switch>
</div>)

