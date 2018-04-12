/*global moment*/
import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';
import Avatar from 'react-user-avatar';
import Paper from 'material-ui/Paper';
import Form from 'react-form-controls';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import Call from 'material-ui-icons/Call';
import Chat from 'material-ui-icons/Chat';
import green from 'material-ui/colors/green';
import { PING_PEER, CALL_PEER } from '../../store/reducers/peer';
import { findPeer } from '../../peers';
import { createFriend } from '../../store/reducers/people';
import { acceptRequest, declineRequest } from '../../store/reducers/requests';
import displayFriendText from '../../friends/displayFriendText';
import ClearBottom from '../../components/ClearBottom';
import CallButton from '../../components/CallButton';
import ProfileBanner from '../../components/ProfileBanner';
import Error from '../../components/Error';

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      profile: null,
      error: null
    }
  }

  componentWillMount () {
    this.loadProfile()
  }

  add () {
    const { match, friendRequest } = this.props
    this.setState({ loading: true })

    friendRequest(match.params.id)
    .then(() => this.loadProfile())
  }

  accept () {
    const { match, acceptRequest } = this.props
    this.setState({ loading: true })

    acceptRequest(match.params.id)
    .then(() => this.loadProfile())
  }

  decline () {
    const { match, declineRequest } = this.props
    this.setState({ loading: true })

    declineRequest(match.params.id)
    .then(() => this.loadProfile())
  }

  loadProfile () {
    const { match } = this.props
    this.setState({ loading: true })

    findPeer(match.params.id)
    .then(profile => this.setState({ profile, loading: false }))
    .catch(error => this.setState({ error, loading: false }))
  }
  render() {
    const { ping, call, match, history } = this.props
    const { loading, error, profile } = this.state
    const peer_id = match.params.id
    return <div className="container">
      <ProfileBanner
      style={{ height: 320, backgroundColor: "#aaa" }}
      src={profile && profile.bannerImg} />
      <Paper className="my-4 p-4">
        {
          (loading ?
          <CircularProgress /> :
          (error ?
          <Error error={error} /> :
          profile ?
          <div className="text-center">
            <Avatar style={{display: "inline-block", color: "#fff"}} className="mx-auto" size="64" name={profile.username} src={profile.avatar} />
            <p>{ profile.username }</p>
            <p className="mb-0"><b>User since</b> { moment(profile.createdAt).fromNow() }</p>
            {
              profile.isFriend ?
              <div>
                <p className="mb-2"><b>Friend since</b> { moment(profile.isFriend).fromNow() }</p>
                {
                  profile.active
                  ? <div style={{ whiteSpace: 'nowrap' }}>
                    <IconButton
                    size="small"
                    onClick={() => ping(peer_id)}><Send />
                    </IconButton>
                    <Button
                    mini
                    variant="fab"
                    style={{ color: "rgba(0,0,0,0.5)", marginRight: 14 }}
                    onClick={() => history.push('/chat/' + peer_id)}><Chat />
                    </Button>
                    <CallButton peer_id={peer_id} />
                  </div>
                  : <div  style={{ whiteSpace: 'nowrap' }}>
                    <Button
                    mini
                    variant="fab"
                    style={{ color: "rgba(0,0,0,0.5)" }}
                    onClick={() => history.push('/chat/' + peer_id)}><Chat />
                    </Button>
                  </div>
                }
              </div> :
              profile.isDeclined ?
              <p className="mb-0"><b>Request declined</b> { moment(profile.isDeclined).fromNow() }</p> :
              profile.isRequestor ?
              <p className="mb-2"><b>Request pending</b></p> :
              profile.isRequestee ?
              <div>
                <Button className="m-4" variant="raised" color="primary" onClick={() => this.accept(profile.request_id)}>Accept</Button>
                <Button className="m-4" variant="raised" color="primary" onClick={() => this.decline(profile.request_id)}>Decline</Button>
              </div> :
              <Button variant="raised" color="primary" onClick={() => this.add(profile._id)}>Add Friend</Button>
            }
          </div> :
          <div />))
        }
      </Paper>
      <ClearBottom />
    </div>
  }
}

export default withRouter(connect(
  () => ({}),
  dispatch => ({
    friendRequest (peer_id) {
      return dispatch(createFriend(peer_id))
    },
    acceptRequst (request_id) {
      return dispatch(acceptRequest(request_id))
    },
    declineRequest (request_id) {
      return dispatch(declineRequest(request_id))
    },
    ping (peer_id) {
      dispatch({ type: PING_PEER, payload: peer_id })
    },
    call (peer_id) {
      dispatch({ type: CALL_PEER, payload: peer_id })
    }
  })
)(Profile));
