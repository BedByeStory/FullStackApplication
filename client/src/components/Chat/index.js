import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Button from 'material-ui/Button'
import Chat from 'material-ui-icons/Chat'

const ChatButtton = ({ style, peer, messages=[], messageSent, history }) =>
  !peer
  ? <div />
  : <Button
    style={style}
    className="m-4 ml-auto"
    color="primary"
    variant="fab"
    onClick={() => history.push('/chat/' + peer._id)}><Chat />
    </Button>

export default withRouter(connect(
  ({ peer: { peer }, messages }) => ({ peer, messages }),
)(ChatButtton))
