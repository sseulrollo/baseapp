import React, { Component } from 'react';
import { Layout, Login } from './container';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends Component {
  static displayName = App.name;
  
  render () {

    return (
      <Provider store={store}>
        <div>
          <Login />
        </div>
      </Provider>
    );
  }
}
