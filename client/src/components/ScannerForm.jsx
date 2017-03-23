import React, { Component } from 'react';

export default class ScannerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slug: '',
      lastInputTime: -Infinity,
      timeoutId: null,
      intervalId: null,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.refs.slug.focus();
    const intervalId = setInterval(() => this.refs.slug.focus(), 500);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  handleChange(event) {
    const slug = event.target.value;
    const thisInputTime = Date.now();
    const { lastInputTime } = this.state;

    this.setState({
      slug,
      lastInputTime: thisInputTime
    });

    const diff = thisInputTime - lastInputTime;
    if (0 < diff && diff < 50) {
      clearTimeout(this.state.timeoutId);
      const timeoutId = setTimeout(() => this.handleSubmit(), 50)
      this.setState({ timeoutId });
    }
  }

  handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }

    const { slug } = this.state;

    if (slug === '') { return; }

    this.props.onSubmit(slug);
    this.setState({ slug: '' });
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
      <input
        type="text"
        id="slug-input"
        ref="slug"
        value={this.state.slug}
        onChange={this.handleChange} />
    </form>;
  }
}
