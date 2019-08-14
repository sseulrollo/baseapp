import React, { Component } from 'react';
import { Layout, Login, InvIn, Main, ProdIn } from './container';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

import { Router, Route } from 'react-router';

import Cookies from 'js-cookie';

const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends Component {
  static displayName = App.name;
  
  render () {
   
    if (Cookies.get('key') !== undefined || Cookies.get('key') !== null)
    
    return (
      <Provider store={store}>
        <Layout>
          <Route exact path='/' component={Main} />
          <Route path='/Main' component={Main} />
          <Route path='/InvIn' component={InvIn} />
          <Route path='/ProdIn' component={ProdIn} />
        </Layout>
      </Provider>
    );
    else
      return (<Provider store={store}>
        <Login />
      </Provider>)
  }
}



const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
