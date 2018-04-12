import React, { Component } from 'react';
import { connect } from 'react-redux'
import Loader from 'react-loader';
import Avatar from 'react-user-avatar';
import { PING_PEER, CALL_PEER } from '../../store/reducers/peer';

const Peer = ({ peer_id, peer, ping, chat, call }) =>
<div className="peer">
  <div className="peerinfo">
    { peer ? <Avatar size="3em" name={peer.username || peer_id} src={peer.avatar} /> : <div/> }
    <div className="peerdetails">
      { peer.username ? <p>{ peer.username }</p> : <div /> }
    </div>
  </div>
  {
    peer.active ?
    <div className="peeractions">
      <button className="button" onClick={ping}>Ping</button>
      <button className="button" onClick={call}>Call</button>
    </div>: <div />
  }
</div>

export default connect(
  () => ({}),
  (dispatch, { peer_id, closeToast=(v=>v) }) => ({
    ping () {
      dispatch({ type: PING_PEER, payload: peer_id })
      closeToast()
    },
    call () {
      dispatch({ type: CALL_PEER, payload: peer_id })
      closeToast()
    }
  })
)(Peer)
