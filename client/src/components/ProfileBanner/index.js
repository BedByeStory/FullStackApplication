import React from 'react'
import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar
})

export default withStyles(styles)(({ src, style, children, classes }) =>
  <div className="position-fixed w-100" style={{
    overflow: "hidden",
    left: 0, top: 0,
    zIndex: -1,
    ...style
  }}>
    { src && <img src={src} style={{
      objectFit: "cover",
      width: "100%",
      height: "100%"
    }} /> }
    { children }
  </div>)
