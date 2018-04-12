import React from 'react'
import IconButton from 'material-ui/IconButton'
import logo from '../Fingerpaint/logo.png'

export default (props) => <div className="text-center">
  <IconButton {...props}>
    <img src={logo} alt="Your App" className="p-1 img-fluid block" />
  </IconButton>
  <p className="m-0">Your App</p>
</div>
