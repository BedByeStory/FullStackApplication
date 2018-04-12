import React, { Component } from 'react';
import { connect } from 'react-redux'
import { INC_COUNTER, DEC_COUNTER } from '../../store/reducers/counter';

const Counter = ({ count, inc, dec }) =>
  <div>
    <button className="button" onClick={dec}>-</button>
    { count }
    <button className="button" onClick={inc}>+</button>
  </div>

export default connect(
  ({ count }) => ({ count }),
  (dispatch) => ({
    inc: () => dispatch({ type: INC_COUNTER, connected: true }),
    dec: () => dispatch({ type: DEC_COUNTER, connected: true }),
  })
)(Counter)
