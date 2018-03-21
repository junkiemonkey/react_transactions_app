import React, { Component } from 'react';
import { object, func, bool } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

export default WrappedComponent => {
  @withRouter
  @connect(({ auth }) => auth, { fetchUser })
  class UserComponent extends Component {
    static propTypes = {
      user: object,
      isAuth: bool,
      fetchUser: func,
      location: object,
      history: object,
    }

    componentWillMount() {
      const { isAuth, fetchUser } = this.props;
      if (!isAuth) {
        fetchUser();
        return null;
      }
      this.checkCredentials(isAuth);
    }

    componentWillReceiveProps(props) {
      this.checkCredentials(props.isAuth);
    }

    checkCredentials = isAuth => {
      const { location, history } = this.props;
      if (!isAuth && location.pathname !== '/login') history.push('/login');
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }
  return UserComponent;
};
