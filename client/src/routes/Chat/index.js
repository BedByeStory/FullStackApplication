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
import Person from '../../components/Person';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import { PING_PEER, CALL_PEER, CALL_CLOSE } from '../../store/reducers/peer';
import { findPeer } from '../../peers';
import { loadMessages, sendMessage } from '../../message';
import ClearBottom from '../../components/ClearBottom';
import ClearTop from '../../components/ClearTop';
import CallButton from '../../components/CallButton';
import Error from '../../components/Error';
import List, { ListItem } from 'material-ui/List';
import cx from '../../utils/cx';

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sending: false,
      loading: true,
      profile: null,
      messages: [],
      error: null
    }
  }

  componentWillMount () {
    this.loadProfile()
    this.loadMessages()
  }
  componentWillReceiveProps () {
    this.loadMessages()
  }
  loadProfile () {
    const { match, peerId } = this.props
    const peer_id = peerId || match.params.id
    this.setState({ loading: true })

    findPeer(peer_id)
    .then(profile => this.setState({ profile, loading: false }))
    .catch(error => this.setState({ error, loading: false }))
  }
  loadMessages () {
    const { match, peerId } = this.props
    const peer_id = peerId || match.params.id

    loadMessages(peer_id)
    .then(messages => this.setState({ messages, sending: false }))
    .then(() => this.scrollToBottom())
    .catch(error => this.setState({ error, sending: false }))
  }
  sendMessage ({ text }) {
    const { match, user, peerId } = this.props
    const content = text.trim()
    const user_id = user._id
    const peer_id = peerId || match.params.id
    const message = { to: peer_id, from: user_id, content }
    const messages = this.state.messages.concat(message)

    if (content) {
      this.setState({ messages, sending: true })
      sendMessage(peer_id, content)
      .then(() => this.loadMessages())
    }
  }
  setScrollTarget (target) {
    this.target = target
  }
  scrollToBottom () {
    if (this.target) {
      this.target.scrollTop = this.target.scrollHeight
    }
  }
  render() {
    const { user, ping, call, match, device, peerId, messageContainerStyle={} } = this.props
    const { loading, error, profile, messages, sending } = this.state
    const peer_id = peerId || match.params.id

    if (!loading && !profile) return <Redirect to={"/profile/" + peer_id} />
    if (!loading && !profile.isFriend) return <Redirect to={"/profile/" + peer_id} />

    return <div className="d-flex" style={{flexDirection: "column", position: "absolute", width: "100%", top: 0, bottom: 0}}>
      <Paper className="p-0">
      <ClearTop />
      {
        loading
        ? <CircularProgress />
        : error
        ? <Error error={error} />
        : profile
        ? <Person
          person={profile}
          primary={profile.username}
          action={profile.active
            ? <div style={{ whiteSpace: 'nowrap' }}>
              <IconButton
              size="small"
              onClick={() => ping(peer_id)}><Send />
              </IconButton>
              <CallButton peer_id={peer_id} />
              </div>
            : <div />} />
        : <div />
      }
      </Paper>
      <div className="container" style={{flex: '1 1 auto', overflowY: 'auto', ...messageContainerStyle}}
      ref={target => this.setScrollTarget(target)}>
        { messages.length
          ? <List>
            { messages.map((message, i) => <ListItem key={message._id || i}>
              <div className={cx({ message: true, sent: message.to === peer_id })}>
                { message.content }
                <div className="message-at">{ moment(message.createdAt).fromNow() }</div>
              </div>
            </ListItem>) }
          </List>
          : <div />
        }
      </div>
      <Paper className="position-relative p-4">
        {sending ? <div /> : <Form className="d-flex" onSubmit={this.sendMessage.bind(this)}>
          <TextField
          name="text"
          style={{flex: 1}}
          onChange={v => v.target.value}
          autoFocus />

          <Button
          type="submit"
          variant="raised"
          color="primary">Send</Button>
        </Form> }
      </Paper>

      { device.isIPhone ? <ClearBottom /> : <div /> }
    </div>
  }
}

export default withRouter(connect(
  ({ peer, profile, messages, device }, { match, peerId }) => ({ peer, device, user: profile, lastMessage: messages[peerId || match.params.id] }),
  dispatch => ({
    ping (peer_id) {
      dispatch({ type: PING_PEER, payload: peer_id })
    },
    call (peer_id) {
      dispatch({ type: CALL_PEER, payload: peer_id })
    }
  })
)(Profile));
