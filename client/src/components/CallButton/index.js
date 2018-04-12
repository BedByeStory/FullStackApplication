import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button'
import Call from 'material-ui-icons/Call';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import { CALL_PEER, CALL_CLOSE } from '../../store/reducers/peer';

const phoneColor = current_peer_id => peer_id =>
  current_peer_id === peer_id ? red[500] : green[500]

const phoneAction = current_peer_id => peer_id =>
  current_peer_id === peer_id ? CALL_CLOSE : CALL_PEER

const ConnectCall = connect(
  ({ peer: { peer } }) => ({ current_peer_id: peer && peer._id }),
  dispatch => ({
    call (current_peer_id, peer_id) {
      const type = phoneAction(current_peer_id)(peer_id)
      dispatch({ type, payload: peer_id })
    }
  })
)

export default ConnectCall(({ current_peer_id, peer_id, call }) =>
  <Button
  mini
  variant="fab"
  onClick={() => call(current_peer_id, peer_id)}
  style={{
    background: phoneColor(current_peer_id)(peer_id),
    color: "#fff"
  }}><Call />
  </Button>)
