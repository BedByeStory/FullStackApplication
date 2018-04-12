import React, { Component } from 'react';
import Avatar from 'react-user-avatar';

const Peer = ({ peer_id, peer }) =>
<div className="peer">
  <div className="peerinfo">
    { peer ? <Avatar size="3em" name={peer.username || peer_id} src={peer.avatar} /> : <div/> }
    <div className="peerdetails">
      <p><b>Calling</b></p>
      <p>{ peer.username || peer_id }</p>
    </div>
  </div>
</div>

export default Peer
