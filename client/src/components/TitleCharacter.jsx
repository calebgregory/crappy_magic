import React, { Component } from 'react';

export default class TitleCharacter extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { x = 0, y = 0, char } = this.props;
    const style = { WebkitTransform: `translate(${x}px,${y}px)` };

    return <span style={style}>{char}</span>
  }
}
