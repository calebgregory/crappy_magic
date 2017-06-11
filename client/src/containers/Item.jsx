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
    const { item, slug } = props;
    if (this.props.slug !== slug) {
      this.setState({ showVideo: false });
    }

    const showVideo = (
      item.mature_content === 'false' || item.mature_content !== 'true'
    );

    setTimeout(() => this.setState({ showVideo }), 50);
  }

  toggleShowVideo() {
    this.setState({ showVideo: !this.state.showVideo });
  }

  render() {
    const { item, slug, goBack } = this.props;
    const { showVideo }  = this.state;

    const url = `${config.VIDEO_API_URL}/videos/${slug}`;

    let fontSize;
    if (item.title.length < 15) {
      fontSize = '10vh';
    } else {
      fontSize = '6vh';
    }
    const titleStyle = { fontSize };

    return (
      <div id="item-container" className="app-container">
        <h1 id="item-title" style={titleStyle}>{item.title}</h1>
        <div className="row">
          <div className="six columns">
            <ItemInfo item={item} />
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
        <div className="row">
          <div id="go-back">
            <a onClick={() => goBack()}>Go Back</a>
          </div>
        </div>
      </div>
    );
  }
}
