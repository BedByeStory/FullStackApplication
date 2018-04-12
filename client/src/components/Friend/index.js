import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Person from '../Person';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import Call from 'material-ui-icons/Call';
import Chat from 'material-ui-icons/Chat';
import green from 'material-ui/colors/green';
import CallButton from '../../components/CallButton';
import { PING_PEER, CALL_PEER } from '../../store/reducers/peer';

export default withRouter(connect(
  () => ({}),
  (dispatch, { _id, closeToast=(v=>v) }) => ({
    ping () {
      dispatch({ type: PING_PEER, payload: _id })
      closeToast()
    },
    call () {
      dispatch({ type: CALL_PEER, payload: _id })
      closeToast()
    }
  })
)(({ _id, person, ping, call, history }) =>
  <Person
    button
    person={person}
    primary={person.username}
    onClick={() => history.push('/profile/' + _id)}
    action={person.active ? <div style={{ whiteSpace: 'nowrap' }}>
      <IconButton
      size="small"
      onClick={ping}><Send />
      </IconButton>
      <Button
      mini
      variant="fab"
      style={{ color: "rgba(0,0,0,0.5)", marginRight: 14 }}
      onClick={() => history.push('/chat/' + _id)}><Chat />
      </Button>
      <CallButton peer_id={_id} />
    </div> : <div  style={{ whiteSpace: 'nowrap' }}>
      <Button
      mini
      variant="fab"
      style={{ color: "rgba(0,0,0,0.5)" }}
      onClick={() => history.push('/chat/' + _id)}><Chat />
      </Button>
    </div>} />))

