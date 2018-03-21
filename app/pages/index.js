import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { func } from 'prop-types';
import withUser from '../decorators/with_user';


/**
 * Components
 */
import Header from '../components/Header';
import Transactions from './Transactions';
import AddTransaction from './AddTransaction';
import Login from './Login';

@withUser
export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Route exact path="/" component={Transactions} />
        <Route exact path="/add" component={AddTransaction} />
        <Route exact path="/login" component={Login} />
      </Fragment>
    );
  }
}

