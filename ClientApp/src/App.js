import React, { Component } from 'react';
import { Layout, Login } from './container';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

import { Router, Route } from 'react-router';

const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends Component {
  static displayName = App.name;
  
  render () {

    return (
      <Provider store={store}>
        <Route exact path='/' component={Login} />
        <Route path='/Main' component={Layout} />
      </Provider>
    );
  }
}
