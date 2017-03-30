import React, { Component } from 'react';

import config from '../config';

import Main from './Main';
import Item from './Item';
import ScannerForm from '../components/ScannerForm';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'Main',
      item: null,
      slug: null,
      timeoutId: null,
    };

    this.getItem = this.getItem.bind(this);
    this.setView = this.setView.bind(this);
    this.renderView = this.renderView.bind(this);
  }

  getItem(slug) {
    this.setState({ slug });

    fetch(`${config.ITEM_API_URL}/item/${slug}`)
      .then((resp) => resp.json())
      .then((item) => {
        this.setState({ item });
        this.setView('Item');
      });
  }

  setView(view) {
    const { timeoutId } = this.state;

    if (timeoutId) {
      clearTimeout(timeoutId);
      this.setState({ timeoutId: null });
    }

    this.setState({ view }, () => {
      const timeoutId = setTimeout(() => this.setView('Main'), 1000 * (60 * 5 /* 5 minutes */ + 30 /* 30 seconds */));
      this.setState({ timeoutId });
    });
  }

  renderView() {
    const { view, item, slug } = this.state;

    switch (view) {
      case 'Main':
        return <Main />;
      case 'Item':
        return <Item item={item} slug={slug} goBack={() => this.setView('Main')} />;
    }

    return null;
  }

  render() {
    return <div className="app-container">
      <ScannerForm onSubmit={this.getItem} />
      {this.renderView()}
    </div>;
  }
}
