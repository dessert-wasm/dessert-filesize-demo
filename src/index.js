import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import * as serviceWorker from './services/serviceWorker';

import './index.css'


ReactDOM.render(
  <div className="page">
    <App />
  </div>, document.getElementById('root'));

serviceWorker.unregister();
