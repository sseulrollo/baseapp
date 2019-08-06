import React, { Component } from 'react';
import { Layout, Login } from './container';


export default class App extends Component {
  static displayName = App.name;
  
  render () {

    return (
      <div>
        <Login />
      </div>
    );
  }
}
