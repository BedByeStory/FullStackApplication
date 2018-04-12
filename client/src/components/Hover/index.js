import React, { Component } from 'react';
import cx from '../../utils/cx';

class Hover extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false
    }
  }
  setActive (active) {
    this.setState({ active })
  }
  render() {
    const { active } = this.state
    const { className, children, ...props } = this.props
    return (
      <div className={cx({
        [className]: true,
        active: active
      })}
      onMouseEnter={this.setActive.bind(this, true)}
      onMouseLeave={this.setActive.bind(this, false)}
      onTouchStart={this.setActive.bind(this, true)}
      onTouchEnd={this.setActive.bind(this, false)}
      {...props} >
        { children }
      </div>
    );
  }
}

export default Hover;
