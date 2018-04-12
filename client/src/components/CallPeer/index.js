import React, { Component } from 'react';
import { connect } from 'react-redux'
import Loader from 'react-loader';
import Avatar from 'react-user-avatar';
import { CALL_ACCEPT, CALL_CANCEL } from '../../store/reducers/peer';

const Peer = ({ peer_id, peer, answer, cancel }) =>
<div className="peer">
  <div className="peerinfo">
    { peer ? <Avatar size="3em" name={peer.username || peer_id} src={peer.avatar} /> : <div/> }
    <div className="peerdetails">
      <p><b>Call From</b></p>
      <p>{ peer.username || peer_id }</p>
    </div>
  </div>
  {
    <div className="peeractions">
      <button className="button" onClick={answer}>Answer</button>
      <button className="button" onClick={cancel}>Cancel</button>
    </div>
  }
</div>

export default connect(
  () => ({}),
  (dispatch, { peer_id, closeToast=(v=>v) }) => ({
    answer () {
      dispatch({ type: CALL_ACCEPT, payload: peer_id })
      closeToast()
    },
    cancel () {
      dispatch({ type: CALL_CANCEL, payload: peer_id })
      closeToast()
    }
  })
)(Peer)
