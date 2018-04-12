import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar
})

export default withStyles(styles)(({ classes }) =>
  <div className={classes.toolbar} />)
