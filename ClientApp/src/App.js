import React, { Component } from 'react';
import { Layout } from './container';


export default class App extends Component {
  static displayName = App.name;
  
  render () {

    return (
      <div>
        <h1> hello </h1>
        <Layout />
      </div>
    );
  }
}
