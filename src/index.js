import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// CSSs Globais
import "./assets/css/reset.css";
import "./assets/css/container.css";
import "./assets/css/btn.css";
import "./assets/css/icon.css";
import "./assets/css/iconHeart.css";
import "./assets/css/notificacao.css";

import "./assets/css/novoTweet.css";
// import './index.css';

import store from './store';
import { Provider } from 'react-redux';

// import App from './App';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
