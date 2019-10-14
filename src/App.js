import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/layout';
import { Home } from './components/home';
import './custom.css'
import { Goals } from './components/goals';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/goals' component={Goals} />
      </Layout>
    );
  }
}
