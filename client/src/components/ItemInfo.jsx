import React, { Component } from 'react';

import config from '../config';

export default class ItemInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item } = this.props;

    return (
      <div id="info-container">
        <div className="text">{item.description}</div>

        <h5>Materials</h5>
        <div className="text">{item.materials}</div>

        <h5>Artist</h5>
        <div className="row">
          <div className="field three columns">Name</div>
          <div className="value nine columns">{item.video_creator_name}</div>
        </div>
        <div className="row">
          <div className="field three columns">Website</div>
          <div className="value nine columns">{item.video_creator_web_address}</div>
        </div>
        <div className="row">
          <div className="field three columns">Instagram</div>
          <div className="value nine columns">{item.video_creator_instagram_handle}</div>
        </div>
        <div className="row">
          <div className="field three columns">Price</div>
          <div className="value nine columns">{'$'+item.price}</div>
        </div>
      </div>
    );
  }
}
