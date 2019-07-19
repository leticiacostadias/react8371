import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import tweetsReducer from './reducers/tweets';
import notificacaoReducer from './reducers/notificacao';

const store = createStore(
  combineReducers({
    tweets: tweetsReducer,
    notificacao: notificacaoReducer
  }),
  applyMiddleware(thunk)
);

console.log('Store foi criada!');

// window.store = store;

export default store;
