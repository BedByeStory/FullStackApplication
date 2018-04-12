import React from 'react';

export default class Bidder extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.innerHTML = this.props.srcDoc || '';
    this.instance.appendChild(s);
  }

  render() {
    const { srcDoc, ...props } = this.props
    return <div
    ref={el => (this.instance = el)}
    {...props} />;
  }
}
