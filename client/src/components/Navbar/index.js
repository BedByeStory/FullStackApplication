import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import SearchIcon from 'material-ui-icons/Search';
import { OPEN_MENU } from '../../store/reducers/menu';
import ProfileAlerts from '../ProfileAlerts';
import ProfileAvatar from '../ProfileAvatar';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  }
})

const Navbar = ({ onOpen, streams, classes, history }) => {
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className="bg-main">
        <IconButton color="inherit" aria-label="Menu" onClick={onOpen}>
          <MenuIcon />
        </IconButton>
        <div style={{ flex: 1 }} />
        {/* <Typography variant="title" color="inherit"
          style={{flex: 1, cursor: "pointer"}}
          onClick={() => history.push('/')}
          >Bed Bye Story
        </Typography> */}
        <IconButton color="inherit" aria-label="Search" onClick={() => history.push("/people")}>
          <SearchIcon />
        </IconButton>
        <ProfileAlerts />
        <ProfileAvatar />
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(connect(
  ({ rtc }) => rtc,
  dispatch => ({
    onOpen: () => dispatch({ type: OPEN_MENU })
  })
)(withStyles(styles)(Navbar)));
