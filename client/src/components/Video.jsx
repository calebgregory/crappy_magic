import React, { Component } from 'react';

// if video hasn't loaded after 10 seconds, go ahead and refresh the page :/
export default class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeoutId: null
    };
  }

  componentWillMount() {
    const timeoutId = setTimeout(() => {
      location.reload();
    }, 10 * 1000 /* 10 seconds */)
    this.setState({ timeoutId });
  }

  componentDidMount() {
    this.refs.video.addEventListener('loadeddata', (event) => {
      clearTimeout(this.state.timeoutId);
      this.setState({ timeoutId: null });
    })
  }

  render() {
    const { url } = this.props;

    return <div>
      <video controls ref="video">
        <source src={url} type="video/mp4" />
      </video>
      <p id="video-note">(Press video for full screen) ^</p>
    </div>;
  }
}
