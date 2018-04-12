import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Hover from '../Hover';
import Button from 'material-ui/Button';
import Avatar from 'react-user-avatar';

const ProfileAvatar = ({ size, loading, profile, onClick, history }) =>
  !loading && profile ?
  <Hover className="avataricon" onClick={() => history.push('/settings')}>
    <Avatar
    size={size || 48}
    style={{color: "#fff"}}
    name={profile.username || "P2P"}
    src={profile.avatar} />
  </Hover> : <Button color="inherit" onClick={() => history.push('/login')}>Login</Button>

export default connect(
  ({ profile }) => profile
)(withRouter(ProfileAvatar))
