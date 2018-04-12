import React from 'react';
import { connect } from 'react-redux';
import { CLOSE_MENU } from '../../store/reducers/menu';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import { Link } from 'react-router-dom';
import { MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import ProfileAvatar from '../ProfileAvatar';
import Home from 'material-ui-icons/Home';
import Call from 'material-ui-icons/Call';
import Receipt from 'material-ui-icons/Receipt';
import VerifiedUser from 'material-ui-icons/VerifiedUser';

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar
})

const Menu = ({ profile: { profile }, menu, onClose, classes }) =>
  <Drawer open={menu.open} onClose={onClose}>
    <List className="links">
      <div className="text-center my-2" onClick={onClose}>
        <ProfileAvatar size={64} />
        { profile && profile.username ? <p>{ profile.username }</p> : <div /> }
      </div>
      <Link to="/" onClick={onClose}>
        <MenuItem>
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Home" />
        </MenuItem>
      </Link>
      <Link to="/friends" onClick={onClose}>
        <MenuItem>
          <ListItemIcon><VerifiedUser /></ListItemIcon>
          <ListItemText primary="Friends" />
        </MenuItem>
      </Link>
      <Link to="/requests" onClick={onClose}>
        <MenuItem>
          <ListItemIcon><Receipt /></ListItemIcon>
          <ListItemText primary="Requests" />
        </MenuItem>
      </Link>
      {/* <Link to="/call" onClick={onClose}>
        <MenuItem>
          <ListItemIcon><Call /></ListItemIcon>
          <ListItemText primary="Call" />
        </MenuItem>
      </Link> */}
    </List>
  </Drawer>

export default connect(
  ({ menu, profile }) => ({ menu, profile }),
  dispatch => ({
    onClose: () => dispatch({ type: CLOSE_MENU })
  })
)(withStyles(styles)(Menu))
