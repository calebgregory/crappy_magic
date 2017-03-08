import React, { Component } from 'react';

export default class ScannerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slug: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      slug: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.state.slug);
    this.setState({ slug: '' });
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
      <input type="text" value={this.state.slug} onChange={this.handleChange} />
    </form>;
  }
}
