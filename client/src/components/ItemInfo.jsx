import React, { Component } from 'react';

import config from '../config';

export default class ItemInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item } = this.props;

    return (
      <div>
        <div className="text">{item.description}</div>

        <h5>Materials</h5>
        <div className="text">{item.materials}</div>

        <h5>Manufacture Info</h5>
        <div className="text">{item.manufacture_info}</div>

        <h5>Owner</h5>
        <div className="row">
          <div className="field three columns">Name</div>
          <div className="value nine columns">{item.owner_name}</div>
        </div>
        <div className="row">
          <div className="field three columns">Email</div>
          <div className="value nine columns">{item.owner_email}</div>
        </div>

        <h5>Video Creator</h5>
        <div className="row">
          <div className="field three columns">Name</div>
          <div className="value nine columns">{item.video_creator_name}</div>
        </div>
        <div className="row">
          <div className="field three columns">Email</div>
          <div className="value nine columns">{item.video_creator_email}</div>
        </div>
        <div className="row">
          <div className="field three columns">Instagram</div>
          <div className="value nine columns">{item.video_creator_instagram_handle}</div>
        </div>
      </div>
    );
  }
}
