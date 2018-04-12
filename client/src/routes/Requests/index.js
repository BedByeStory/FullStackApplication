import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Title from '../../components/Title';
import { shareProfile } from '../../store/actions';
import FriendRequest from '../../components/FriendRequest';
import Receipt from 'material-ui-icons/Receipt';

export default connect(
  ({ requests }) => requests,
  dispatch => ({
    share: () => dispatch(shareProfile())
  })
)(({ loading, requests=[], error, share, ...props }) => <Paper {...props}>
<AppBar position="static">
  <Toolbar className="px-4">
    Requests
  </Toolbar>
</AppBar>
{
  !requests.length ?
  <div style={{ textAlign: "center" }}>
    <div className="main-circle bg-gradient">
      <Receipt style={{ fontSize: 64, color: '#fff' }} />
    </div>
    <div style={{ paddingBottom: '1em' }}>
      <Link to="/people" style={{textDecoration: "none"}}>
        <Button variant="raised" color="primary" style={{ margin: 4 }}>
          Browse
        </Button>
      </Link>
      <Button onClick={share} variant="raised" color="primary" style={{ margin: 4 }}>
        Share
      </Button>
    </div>
  </div> :
  <List>{
    requests.map((request) =>
      <FriendRequest
      action_id={request._id}
      key={request._id}
      person={request.requestor} />)
  }</List>
}</Paper>)
