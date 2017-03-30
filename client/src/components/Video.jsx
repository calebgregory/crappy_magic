import React, { Component } from 'react';

export default class Video extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { url } = this.props;

    return <div>
      <video controls>
        <source src={url} type="video/mp4" />
      </video>
      <p id="video-note">(Press video for full screen) ^</p>
    </div>;
  }
}
