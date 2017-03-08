import React, { Component } from 'react';

import config from '../config';

import ItemInfo from '../components/ItemInfo';
import Video from '../components/Video';
import MatureContentWarning from '../components/MatureContentWarning';

export default class Item extends Component {
  constructor(props) {
    super(props);

    const { item } = props;
    const showVideo = (
      item.mature_content === 'false' || item.mature_content !== 'true'
    );

    this.state = { showVideo };

    this.toggleShowVideo = this.toggleShowVideo.bind(this);
  }

  toggleShowVideo() {
    this.setState({ showVideo: !this.state.showVideo });
  }

  render() {
    const { item, slug } = this.props;
    const { showVideo }  = this.state;

    const url = `${config.VIDEO_API_URL}/videos/${slug}`;

    return (
      <div>
        <h1>{item.title}</h1>
        <ItemInfo item={item} />
        {
          showVideo ?
            <Video url={url} /> :
            <MatureContentWarning onApprove={this.toggleShowVideo} />
        }
      </div>
    );
  }
}
