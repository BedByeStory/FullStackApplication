import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Title from '../../components/Title';
import Friend from '../../components/Friend';
import { shareProfile } from '../../store/actions';
import VerifiedUser from 'material-ui-icons/VerifiedUser';

export default connect(
  ({ friends }) => friends,
  dispatch => ({
    share: () => dispatch(shareProfile())
  })
)(({ loading, friends=[], error, share, ...props }) => <Paper {...props}>
  <AppBar position="static">
    <Toolbar className="px-4">
      Friends
    </Toolbar>
  </AppBar>
  {/* <Title>Friends</Title> */}
  {
    !friends.length ?
    <div style={{ textAlign: 'center' }}>
      <div className="main-circle bg-gradient">
        <VerifiedUser style={{ fontSize: 64, color: '#fff' }} />
      </div>
      <div style={{ paddingBottom: '1em' }}>
        <Link to="/people" style={{textDecoration: "none"}}>
          <Button variant="raised" color="primary" style={{ margin: 4 }}>Browse</Button>
        </Link>
        <Button onClick={share} variant="raised" color="primary" style={{ margin: 4 }}>Share</Button>
      </div>
    </div> :
    <List>{
      friends.map((friend) =>
        <Friend
        _id={friend._id}
        key={friend._id}
        primary={friend.username}
        person={friend} />)
    }</List>
}</Paper>)
