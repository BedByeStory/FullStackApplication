import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Rodal from 'rodal';
import Form from 'react-form-controls';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import { LOGIN_PROFILE, SIGNUP_PROFILE } from '../../store/reducers/profile';
import 'rodal/lib/rodal.css';

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: '',
      value: props.signup ? 1 : 0
    }
  }
  setErrors (errors='') {
    console.log(errors)
    this.setState({ errors })
  }
  handleChange () {

  }
  renderLogin () {
    const { errors } = this.state
    const { onLogin, error } = this.props
    const errMess = errors || (error ? error.message : '')

    return <div>
      <Form onSubmit={({ email, password }) => {
        if (!email) return this.setErrors('Email is required')
        if (!password) return this.setErrors('Password is required')
        this.setErrors('')
        onLogin({ email, password })
      }} className="form">

        <TextField
        fullWidth
        id="email"
        label="Email"
        name="email"
        onChange={v => v.target.value}
        style={{marginBottom: 10}} />

        <TextField
        fullWidth
        type="password"
        id="password"
        label="Password"
        name="password"
        onChange={v => v.target.value}
        style={{marginBottom: 10}} />

        { errMess ? <p className="error">{ errMess }</p> : <div /> }
        <Button type="submit" variant="raised" color="primary">Login</Button>
      </Form>
    </div>
  }
  renderSignup () {
    const { errors } = this.state
    const { onSignup, error } = this.props
    const errMess = errors || (error ? error.message : '')

    return <div>
      <Form onSubmit={({ username, email, password, passwordVerify }) => {
        if (!username) return this.setErrors('Username is required')
        if (!email) return this.setErrors('Email is required')
        if (!password) return this.setErrors('Password is required')
        if (password !== passwordVerify) return this.setErrors('Password is invalid')
        this.setErrors('')
        onSignup({ username, email, password })
      }} className="form">

        <TextField
        fullWidth
        id="username"
        label="Username"
        name="username"
        onChange={v => v.target.value}
        style={{marginBottom: 10}} />

        <TextField
        fullWidth
        id="email"
        label="Email"
        name="email"
        onChange={v => v.target.value}
        style={{marginBottom: 10}} />

        <TextField
        fullWidth
        type="password"
        id="password"
        label="Password"
        name="password"
        onChange={v => v.target.value}
        style={{marginBottom: 10}} />

        <TextField
        fullWidth
        type="password"
        id="password"
        label="Verify Password"
        name="passwordVerify"
        onChange={v => v.target.value}
        style={{marginBottom: 10}} />

        { errMess ? <p className="error">{ errMess }</p> : <div /> }
        <Button type="submit" variant="raised" color="primary">Signup</Button>
      </Form>
    </div>
  }
  handleChange (ev, value) {
    this.setState({ value });
  }
  render() {
    const { value } = this.state
    const { onClose, loading, profile, location } = this.props
    const { from } = location.state || { from: { pathname: "/status" } }
    if (!loading && profile) return <Redirect to={from} />

    return (
    <div>
      <div className="bg-gradient" style={{height: "100vh", zIndex: 1501}} />
      <Dialog onClose={onClose} open={true} maxWidth={'xs'}>
        <AppBar position="static">
          <Tabs className="bg-main" value={value} onChange={this.handleChange.bind(this)} fullWidth>
            <Tab label="Login" />
            <Tab label="Signup" />
          </Tabs>
        </AppBar>
        { value === 0 && this.renderLogin() }
        { value === 1 && this.renderSignup() }
      </Dialog>
    </div>
    );
  }
}

export default withRouter(connect(
  ({ profile }) => profile,
  (dispatch, { history }) => ({
    onClose: () => history.push('/'),
    onLogin: (peerData) => dispatch({
      type: LOGIN_PROFILE,
      payload: peerData
    }),
    onSignup: (peerData) => dispatch({
      type: SIGNUP_PROFILE,
      payload: peerData
    })
  })
)(Login));
