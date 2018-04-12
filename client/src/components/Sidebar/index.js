import React, { Component } from 'react';
import cx from '../../utils/cx';

class Sidebar extends Component {
  render() {
    const { children, left, right, className } = this.props
    return (
      <div className={cx({
        [className]: true,
        sidebar: true,
        left,
        right
      })}>
        { children }
      </div>
    );
  }
}

export default Sidebar;
