import React, { Component } from 'react';
import { func, bool, object, string } from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * Actions
 */
import { logout } from '../../actions';


@withRouter
@connect(null, { logout })
export default class Header extends Component {
  static propTypes = {
    logout: func,
  }

  logoutHandle = e => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <header className="header">
        <div className="container">
          <div className="header__menu">
            <ul className="clearlist">
              <li><NavLink to="/" exact className="header__link">Transactions</NavLink></li>
              <li><NavLink to="/add" className="header__link">Add</NavLink></li>
            </ul>
            <a href="" className="header__link" onClick={this.logoutHandle}>Logout</a>
          </div>
        </div>
      </header>
    );
  }
}

