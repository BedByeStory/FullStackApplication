import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import Drawer from 'material-ui/Drawer';
import ClearBottom from '../ClearBottom';
import ChatUI from '../../routes/Chat';
import Stream from '../Stream';
import Chat from '../Chat';

const styles = (theme) => ({
  drawerDesktop: { position: 'relative', width: 320 },
  drawerDesktopClosed: { position: 'relative', width: 0, borderLeft: 'none' },
  drawerMobile: { position: 'relative', flexDirection: 'row', flexWrap: 'nowrap', overflow: 'hidden' },
  toolbar: theme.mixins.toolbar
})

const Streams = ({ peer, streams=[], error, classes, isIPhone }) =>
<div>
  <Hidden smDown>
    <Drawer
    open={true}
    anchor="right"
    variant="permanent"
    classes={{ paper: (streams.length ? classes.drawerDesktop : classes.drawerDesktopClosed) }}>
      <div className={classes.toolbar} />
      <div className={classes.toolbar} />
      { !peer ? <div /> : <ChatUI peerId={peer._id} messageContainerStyle={{ paddingTop: '120%' }} /> }
      { (streams).map((stream, i) => <Stream key={i} stream={stream} />) }
    </Drawer>
  </Hidden>
  <Hidden mdUp>
    <Drawer
    open={true}
    anchor="bottom"
    variant="permanent"
    classes={{ paper: classes.drawerMobile }}>
      <div className="streams">
        { (streams).map((stream, i) => <Stream key={i} stream={stream} />) }
      </div>
      <Chat style={{position: "absolute", bottom: 0, right: 0, transform: "translate3d(60%,60%,0)"}} />
    </Drawer>
    { (streams.length && isIPhone)
      ? <ClearBottom />
      : <div />
    }
  </Hidden>
</div>

export default connect(
  ({ rtc, device, peer: { peer } }) => ({ ...rtc, ...device, peer })
)(withStyles(styles)(Streams))
