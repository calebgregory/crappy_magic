import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';

require('./assets/css/normalize.css');
require('./assets/css/skeleton.css');
require('./styles.css');
require('./fonts.css');

render(<App />, document.getElementById('root'));
