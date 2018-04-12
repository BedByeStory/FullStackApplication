import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Hover from '../Hover';
import Button from 'material-ui/Button';
import Avatar from 'react-user-avatar';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Alert from 'material-ui-icons/AddAlert';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import Paper from 'material-ui/Paper';
import Collapse from 'material-ui/transitions/Collapse';
import Grow from 'material-ui/transitions/Grow';
import { withStyles } from 'material-ui/styles';
import Portal from 'material-ui/Portal';
import cx from '../../utils/cx';
import { Manager, Target, Popper } from 'react-popper';
import Menu, { MenuList, MenuItem } from 'material-ui/Menu';
import { readAlerts } from '../../store/reducers/alerts';
import FriendRequest from '../FriendRequest';

const Components = {
  FRIEND_REQUEST: FriendRequest
}

const styles = () => ({
  popperClose: {
    pointerEvents: 'none',
  },
})

class ProfileAlert extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }
  handleClick = () => {
    const open = !this.state.open
    this.setState({ open })
  }
  handleClose = (event) => {
    if (this.target.contains(event.target)) {
      return;
    }

    this.props.read(this.props.alerts)
    this.setState({ open: false })
  }
  renderAlert (alert, i) {
    const Component = Components[alert.type]
    return <Component key={i} person={alert.from_id} {...alert} />
  }
  render () {
    const { open } = this.state;
    const { loading, alerts=[], error, classes } = this.props
    const valid = alerts.filter(a => Components[a.type])
    return valid.length ?
    <Manager>
      <Target>
        <div ref={target => this.target = target}>
          <IconButton
            style={{color:"#fff"}}
            onClick={this.handleClick}>
            <Badge badgeContent={valid.length} color="secondary">
              <Alert />
            </Badge>
          </IconButton>
        </div>
      </Target>
      <Popper
        placement="bottom-end"
        eventsEnabled={open}
        className={cx({ [classes.popperClose]: !open })}
      >
        <ClickAwayListener onClickAway={this.handleClose}>
          <Grow in={open} id="menu-list-grow" style={{ transformOrigin: '0 0 0' }}>
            <Paper>
              <MenuList role="menu">
                { valid.map((a, i) =>
                <MenuItem key={i} style={{ margin: '0.2em 0' }}>
                  { this.renderAlert(a, i) }
                </MenuItem>) }
              </MenuList>
            </Paper>
          </Grow>
        </ClickAwayListener>
      </Popper>
    </Manager> : <div />
  }
}

export default withRouter(connect(
  ({ alerts }) => alerts,
  dispatch => ({
    read (alerts) {
      dispatch(readAlerts(alerts))
    }
  })
)(withStyles(styles)(ProfileAlert)))
