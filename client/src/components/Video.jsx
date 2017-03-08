import React, { Component } from 'react';

export default class Video extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { url } = this.props;

    return <video autoPlay controls>
      <source src={url} type="video/mp4" />
    </video>;
  }
}
