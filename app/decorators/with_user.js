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
      history: object,
    }

    async componentWillMount() {
      const { user, fetchUser } = this.props;
      if (!user) {
        await fetchUser();
      }
      this.checkCredentials(this.props.user);
    }

    componentWillReceiveProps(props) {
      this.checkCredentials(props.user);
    }

    checkCredentials = user => {
      if (!user) this.props.history.push('/login');
    }

    render() {
      if (!this.props.user) return null;
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }
  return UserComponent;
};
