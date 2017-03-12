import React, { Component } from 'react';

export default class MatureContentWarning extends Component {
  constructor(props) {
    super(props);


    this.state = {
      selected: false,
      timeoutId: null
    }

    this.sayNo = this.sayNo.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
  }

  componentWillUnmount() {
    const { timeoutId } = this.state;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  sayNo() {
    this.setState({ selected: 'no' }, () => {
      const timeoutId = setTimeout(() => {
        this.setState({
          selected: 'maybe',
          timeoutId: null
        });
      }, 1000 * 10 /* 10 seconds */)

      this.setState({ timeoutId });
    })
  }

  renderOptions() {
    const { onApprove } = this.props;
    const { selected }  = this.state;

    switch (selected) {
      case 'no':
        return <span>~ok~, that's cool.</span>;
      case 'maybe':
        return <a onClick={onApprove}>...Change your mind?</a>;
    }

    return <span>
      <a onClick={onApprove}>~Yes</a> | <a onClick={this.sayNo}>No~</a>
    </span>;
  }

  render() {
    return <div>
      <p>This video contains mature content.</p>
      <p>Do you wish to see it? {this.renderOptions()}</p>
    </div>;
  }
}
