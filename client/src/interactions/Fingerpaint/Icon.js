import React from 'react'
import IconButton from 'material-ui/IconButton'
import logo from './logo.png'

export default (props) => <div className="text-center">
  <IconButton {...props}>
    <img src={logo} alt="Fingerpaint" className="p-1 img-fluid block" />
  </IconButton>
  <p className="m-0">Fingerpaint</p>
</div>
