import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Main from '../../components/Main';
import Counter from '../../components/Counter';

export default connect(
  ({ profile }) => profile
)(({ loading, profile }) => {
  return <div className="container">
  <div className="row">
    <Counter />
  </div>
  </div>
})
