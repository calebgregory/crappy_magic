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

  componentWillReceiveProps(props) {
    const { item } = props;
    const showVideo = (
      item.mature_content === 'false' || item.mature_content !== 'true'
    );

    this.setState({ showVideo });
  }

  toggleShowVideo() {
    this.setState({ showVideo: !this.state.showVideo });
  }

  render() {
    const { item, slug, goBack } = this.props;
    const { showVideo }  = this.state;

    const url = `${config.VIDEO_API_URL}/videos/${slug}`;

    return (
      <div id="item-container" className="app-container">
        <div className="row">
          <h1 id="item-title">{item.title}</h1>
        </div>
        <div className="row">
          <div className="six columns">
            <ItemInfo item={item} />
            <div id="go-back">
              <a onClick={() => goBack()}>Go Back</a>
            </div>
          </div>
          <div className="six columns">
            <div id="video-container">
              {
                showVideo ?
                  <Video url={url} /> :
                  <MatureContentWarning onApprove={this.toggleShowVideo} />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
