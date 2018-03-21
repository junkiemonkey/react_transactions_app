import React, { Component } from 'react';
import { func, array, object } from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { addItem, fetchBanks } from '../../actions';


@connect(({ transactions }) => transactions, { addItem, fetchBanks })
export default class AddTransaction extends Component {
  static propTypes = {
    bankList: array,
    fetchBanks: func,
    addItem: func,
  }

  state = {
    amount: '',
    amountError: false,
    bankId: '',
    bankError: false,
    success: false,
    bankList: [],
  }

  componentWillMount() {
    const { bankList, fetchBanks } = this.props;
    if (!bankList) {
      fetchBanks();
      return null;
    }
    this.setState({ bankList });
  }

  componentWillReceiveProps(props) {
    const { bankList } = props;
    if (bankList) this.setState({ bankList });
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleForm = ({ target: { name, value } }) => {
    if (name === 'amount') value = value.replace(/[^0-9.]/g, '');
    this.setState({ [name]: value });
  };

  submitForm = e => {
    e.preventDefault();
    if (!this.validate()) return null;
    const { amount, bankId } = this.state;
    this.props.addItem({ amount, bankId });
    this.setState({
      amount: '',
      bankId: '',
      amountError: false,
      bankError: false,
      success: true,
    }, () => {
      this.timeout = setTimeout(() => this.setState({ success: false }), 1500);
    });
  }

  validate = () => {
    const { amount, bankId } = this.state;

    if (!amount) {
      this.setState({ amountError: true });
      return null;
    }
    this.setState({ amountError: false });
    if (!bankId) {
      this.setState({ bankError: true });
      return null;
    }
    this.setState({ bankError: false });
    return true;
  }

  render() {
    const {
      state: {
        bankList,
        amount,
        bankId,
        amountError,
        bankError,
        success,
      },
      handleForm,
      submitForm,
    } = this;

    return (
      <div className="add-page">
        <div className="container">
          <h1 className="title">Добавить</h1>
          {success && <div className="add-page__success">Добавлено!</div>}
          <div className="add-page__form">
            <form onSubmit={submitForm}>
              <div className="form-block">
                <label>Сумма</label>
                <input
                  type="text"
                  onChange={handleForm}
                  value={amount}
                  name="amount"
                  required
                  className={classNames({ invalid: amountError })}
                />
              </div>
              <div className="form-block">
                <label>Банк</label>
                <select
                  name="bankId"
                  onChange={handleForm}
                  value={bankId}
                  required
                  className={classNames({ invalid: bankError })}
                >
                  <option value="" disabled>Выбрать...</option>
                  {bankList.map(item => <option key={item.id} value={item.id}>{item.value}</option>)}
                </select>
              </div>
              <div className="form-block text-center">
                <button type="submit">Добавить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

