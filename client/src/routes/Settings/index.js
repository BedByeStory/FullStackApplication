import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Form from 'react-form-controls';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import IconButton from 'material-ui/IconButton';
import CloudUpload from 'material-ui-icons/CloudUpload';
import Add from 'material-ui-icons/Add';
import { EDIT_PROFILE, LOGOUT } from '../../store/reducers/profile';
import Friends from '../Friends'
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Requests from '../Requests'
import Avatar from 'react-user-avatar'
import Uploader from '../../components/Uploader'
import S3 from '../../aws/s3'
import ClearBottom from '../../components/ClearBottom';
import ProfileBanner from '../../components/ProfileBanner';
import defaultIcon from './profile.png';

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: '',
      loading: false
    }
  }
  componentWillMount () {
    const { credentials } = this.props
    this.s3 = S3({
      name: 'bedbyeusers',
      region: 'us-west-2',
      identityPool: 'us-west-2:75bb68c1-5630-49a5-b596-78137c547309'
    })
  }
  saveFile (name, file) {
    return this.s3.then((s3) => {
      return new Promise((res, rej) => s3.upload({
        Key: name,
        ContentType: file.type,
        Body: file,
        ACL: 'public-read'
      }, (err, result) => {
        if (err) return rej(err)
        res(result.Location)
      }))
    })
  }
  onSaveAvatar (file) {
    const { profile, onSubmit } = this.props
    const name = ['avatar', profile._id, new Date().getTime()].join('_')
    this.setState({ loading: true })
    this.saveFile(name, file)
    .then(avatar => onSubmit({ avatar }))
    .then(() => this.setState({ loading: false }))
    .catch(err => {
      this.setState({
        error: err.message,
        loading: false
      })
    })
  }
  onSaveBanner (file) {
    const { profile, onSubmit } = this.props
    const name = ['banner', profile._id, new Date().getTime()].join('_')
    this.setState({ loading: true })
    this.saveFile(name, file)
    .then(bannerImg => onSubmit({ bannerImg }))
    .then(() => this.setState({ loading: false }))
    .catch(err => {
      this.setState({
        error: err.message,
        loading: false
      })
    })
  }
  render() {
    const { error: uploadErr, loading: isUploading } = this.state
    const { loading, error, profile, onSubmit, onClose, onLogout } = this.props
    return <div className="container">
      <ProfileBanner
      style={{ height: 320, backgroundColor: "#aaa" }}
      src={profile && profile.bannerImg} />
      <Paper className="mt-4">
        <AppBar position="static">
          <Toolbar className="px-4">
            <span>Settings</span>
            <div style={{ flex: 1 }} />
            {
            isUploading || loading
            ? <div />
            : <Uploader
              id="banner"
              onSave={this.onSaveBanner.bind(this)}
              style={{
                color: "#fff",
                paddingTop: "8px"
              }}
              defaultIcon={<IconButton color="inherit">
                <CloudUpload />
              </IconButton>}
              draggingStyle={{ opacity: 0.8 }} />
            }
          </Toolbar>
        </AppBar>
        <div className="d-flex">
          <div className="text-center pt-4 mx-4 white">
          {
          isUploading || loading
          ? <CircularProgress />
          : <Uploader
            id="avatar"
            onSave={this.onSaveAvatar.bind(this)}
            defaultIcon={<IconButton
              color="inherit" style={{
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              margin: "auto",
              color: "#fff",
              filter: "drop-shadow(3px 4px 5px #000)"
            }}>
              <CloudUpload />
            </IconButton>}
            uploadIcon={profile && profile.avatar || defaultIcon}
            draggingStyle={{ opacity: 0.8 }} />
          }
          </div>
          <Form style={{flex: 1}} onSubmit={({ username, email }) => {
            onSubmit({ username, email })
          }} className="form">

            <TextField
            fullWidth
            id="username"
            label="Username"
            name="username"
            onChange={v => v.target.value}
            value={profile && profile.username}
            style={{marginBottom: 10}} />

            <TextField
            fullWidth
            id="email"
            label="Email"
            name="email"
            onChange={v => v.target.value}
            value={profile && profile.email}
            style={{marginBottom: 10}} />

            { error ? <p className="error">{ error.message }</p> : <div /> }

            <Button type="submit" variant="raised" color="primary">Save</Button>

            <Button onClick={onLogout} style={{marginLeft: 10}}>Logout</Button>

          </Form>
        </div>
      </Paper>
      <div className="row mb-4">
        <div className="col-md-6 mt-4">
          <Friends className="fill scroll-300" />
        </div>
        <div className="col-md-6 mt-4">
          <Requests className="fill scroll-300" />
        </div>
      </div>
      <ClearBottom />
    </div>
  }
}

export default withRouter(connect(
  ({ profile }) => profile,
  (dispatch, { history }) => ({
    onClose: () => history.goBack(),
    onSubmit: (peerData) => dispatch({
      type: EDIT_PROFILE,
      payload: peerData
    }),
    onLogout: () => {
      history.push('/')
      dispatch({ type: LOGOUT })
    }
  })
)(Profile));
