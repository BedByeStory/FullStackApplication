import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
  bottombar: {height: 75}
})

export default withStyles(styles)(({ classes }) =>
  <div className={classes.bottombar} />)
