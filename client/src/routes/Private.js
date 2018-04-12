import React from 'react'
import { Redirect, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getToken } from '../utils/token'

export default withRouter(connect(
  ({ profile }) => ({ isAuthenticated: !profile.loading && profile.profile })
)(({ location, isAuthenticated, component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => (
    getToken()
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: location }
        }} />
  )} />
}))
