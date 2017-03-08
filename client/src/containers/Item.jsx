import React, { Component } from 'react';



export default class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item, slug } = this.props;

    return (
      <div>
        Item
      </div>
    );
  }
}
