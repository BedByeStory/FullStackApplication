import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Form from 'react-form-controls';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import NoFriendsIcon from 'material-ui-icons/HdrWeak';
import Person from '../../components/Person';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import { CircularProgress } from 'material-ui/Progress';
import { Circurlar } from '../../components/ProgressButton';
import Add from 'material-ui-icons/Add';
import { searchPeople, createFriend } from '../../store/reducers/people';
import displayFriendText from '../../friends/displayFriendText';
import ClearBottom from '../../components/ClearBottom';

class People extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dirty: false
    }
  }
  setDirty () {
    this.setState({ dirty: true })
  }
  render () {
    const { dirty } = this.state
    const { loading=false, people=[], searchPeople, friendRequest, history } = this.props
    return <div className="container">
    <Paper style={{ margin: '1em 0', padding: '1em' }}>
      <Form onSubmit={(search) => {
        searchPeople(search)
        this.setDirty()
      }} style={{ display: "flex", marginBottom: 10 }}>
        <TextField
        id="search"
        label="Search"
        name="search"
        style={{flex: 1}}
        onChange={v => v.target.value}
        autoFocus />

        <Button
        type="submit"
        variant="raised"
        color="primary">Search</Button>
      </Form>

    </Paper>
    <div className="search-results">
    { loading
      ? <div className="text-center"><CircularProgress /></div>
      : people.length
      ? <List>{
        people.map((peer) =>
          <Person
          button
          key={peer._id}
          person={peer}
          primary={peer.username}
          secondary={displayFriendText(peer)}
          onClick={() => history.push('/profile/' + peer._id)}
          action={<Button
            variant="raised"
            onClick={() => history.push('/profile/' + peer._id)}>
            View Profile
          </Button>} />)
      }</List>
      : dirty
      ? <Paper className="p-4">
        No one found
      </Paper>
      : <Paper className="p-4">
        Search for friends or family
      </Paper>
    }
    </div>
    <ClearBottom />
  </div>
  }
}

export default withRouter(connect(
  ({ people }) => people,
  (dispatch) => ({
    searchPeople ({ search }) {
      dispatch(searchPeople({ search }))
    },
    friendRequest (peer_id) {
      dispatch(createFriend(peer_id))
    }
  })
)(People))
