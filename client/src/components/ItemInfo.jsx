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
        <p>{item.description}</p>

        <h5>Materials</h5>
        <p>{item.materials}</p>

        <h5>Manufacture Info</h5>
        <p>{item.manufacture_info}</p>

        <h5>Owner</h5>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{item.owner_name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{item.owner_email}</td>
            </tr>
          </tbody>
        </table>

        <h5>Video Creator</h5>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{item.video_creator_name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{item.video_creator_email}</td>
            </tr>
            <tr>
              <td>Instagram</td>
              <td>{item.video_creator_instagram_handle}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
