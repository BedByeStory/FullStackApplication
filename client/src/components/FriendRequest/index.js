import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Person from '../Person'
import IconButton from 'material-ui/IconButton'
import Accept from 'material-ui-icons/CheckCircle'
import Delete from 'material-ui-icons/Delete'
import { acceptRequest, declineRequest } from '../../store/reducers/requests'

export default withRouter(connect(
  () => ({}),
  (dispatch, { action_id }) => ({
    onAccept () {
      dispatch(acceptRequest(action_id))
    },
    onDecline () {
      dispatch(declineRequest(action_id))
    }
  })
)(({ action_id, person, onAccept, onDecline, history }) =>
  <Person
    button
    person={person}
    primary={person.username}
    secondary="New Friend Request"
    onClick={() => history.push('/profile/' + person._id)}
    action={<div>
      <IconButton size="small" onClick={onAccept}><Accept /></IconButton>
      <IconButton size="small" onClick={onDecline}><Delete /></IconButton>
    </div>} />))

