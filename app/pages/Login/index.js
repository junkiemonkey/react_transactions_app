import React, { Component } from 'react';
import { func, object, string, bool } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/**
 * Action
 */
import { login, fetchUser } from '../../actions';

@withRouter
@connect(({ auth }) => auth, { login, fetchUser })
export default class Login extends Component {
  static propTypes = {
    login: func,
    fetchUser: func,
    user: object,
    history: object,
    error: string,
    isAuth: bool,
  }

  state = {
    username: '',
    password: '',
  }

  componentWillMount() {
    const { fetchUser, user, history: { push } } = this.props;
    if (user) push('/');
    fetchUser();
  }

  componentWillReceiveProps(props) {
    if (props.isAuth) this.props.fetchUser();
    if (props.user) this.props.history.push('/');
  }

  handleForm = ({ target: { name, value } }) => this.setState({ [name]: value })

  submitForm = e => {
    e.preventDefault();
    this.props.login(this.state);
    this.setState({ username: '', password: '' });
  }

  render() {
    const {
      props: { error },
      state: {
        username,
        password,
      },
      submitForm,
      handleForm,
    } = this;
    return (
      <div className="login">
        <h1 className="title">Login</h1>
        {error && <div className="login__error">{ error }</div>}
        <div className="login__form">
          <form onSubmit={submitForm}>
            <div className="form-block">
              <input
                required
                type="text"
                name="username"
                placeholder="username"
                value={username}
                onChange={handleForm}
              />
            </div>
            <div className="form-block">
              <input
                required
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={handleForm}
              />
            </div>
            <div className="form-block"><button>Войти</button></div>
          </form>
        </div>
      </div>
    );
  }
}

