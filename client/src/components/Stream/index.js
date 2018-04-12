import React, { Component } from 'react';

class Stream extends Component {
  constructor (props) {
    super(props)
  }
  setSrc (video) {
    const { stream } = this.props
    if (video && typeof stream === 'string') {
      video.src = stream
      this.video = video
    } else if (video && stream) {
      video.srcObject = stream
      this.video = video
      // this.video.play()
    }
  }
  play () {
    this.video && this.video.play()
  }
  render() {
    return (
      <div className="stream">
        <video
          ref={video => this.setSrc(video)}
          onClick={this.play.bind(this)}
          playsInline
          autoPlay />
      </div>
    );
  }
}

export default Stream;
