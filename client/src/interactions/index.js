import React, { Component } from 'react'
import Portal from 'material-ui/Portal'
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton'
import Back from 'material-ui-icons/ArrowBack';
import LibraryBooks from 'material-ui-icons/LibraryBooks';
import Brush from 'material-ui-icons/Brush';
import Music from 'material-ui-icons/QueueMusic';
import Today from 'material-ui-icons/Today';
import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip';
import AppBar from 'material-ui/AppBar';
import { CircularProgress } from 'material-ui/Progress';

const rootStyle = { flexBasis: "50%", textAlign: "center"}
const iconSize = { height: 120, width: 120, margin: "auto" }
const iconStyle = { fontSize: 64, color: "#fff" }

export default class Interactions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: null,
      Component: null
    }
  }
  setCmp (name, pathname) {
    if (!pathname) return this.setState({ name, Component: null })

    this.setState({ name, loading: true })
    return import('./' + pathname + '/index')
    .then((Component) => {
      return process.env.NODE_ENV !== 'development'
      ? Component : new Promise((res) => {
        setTimeout(() => res(Component), 2000)
      })
    })
    .then((Component) => Component.default)
    .then((Component) => {
      this.setState({
        name,
        Component,
        loading: false
      })
    })
    .catch(() => {
      this.setState({
        name: null,
        Component: null,
        loading: false
      })
    })
  }
  render () {
    const { Component, loading, name } = this.state
    return <Paper className="p-0 fill">{
      (loading || Component)
      ? <div>
        <AppBar position="static">
          <Toolbar className="p-0">
            <IconButton color="inherit" onClick={this.setCmp.bind(this, null, null)}><Back /></IconButton>
            { name }
          </Toolbar>
        </AppBar>
        {
          loading
          ? <div className="interactions p-4">
            <CircularProgress />
          </div>
          : <Component />
        }
      </div>
      : <div>
        <AppBar position="static">
          <Toolbar className="px-4">
            Interactions
          </Toolbar>
        </AppBar>
        <div className="interactions p-4">

            <Tooltip title="Read" style={rootStyle} placement="top">
              <IconButton
              style={iconSize}
              onClick={this.setCmp.bind(this, 'Read', 'Read')}
              className="m-4 main-circle bg-gradient">
                <LibraryBooks style={iconStyle} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Fingerpaint" style={rootStyle} placement="top">
              <IconButton
              style={iconSize}
              onClick={this.setCmp.bind(this, 'Fingerpaint', 'ComingSoon')}
              className="m-4 main-circle bg-gradient">
                <Brush style={iconStyle} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Drummer" style={rootStyle} placement="top">
              <IconButton
              style={iconSize}
              onClick={this.setCmp.bind(this, 'Drummer', 'ComingSoon')}
              className="m-4 main-circle bg-gradient">
                <Music style={iconStyle} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Coming Soon" style={rootStyle} placement="top">
              <IconButton
              style={iconSize}
              onClick={this.setCmp.bind(this, 'Coming Soon', 'ComingSoon')}
              className="m-4 main-circle bg-gradient">
                <Today style={iconStyle} />
              </IconButton>
            </Tooltip>
        </div>
      </div>
    }</Paper>
  }
}
