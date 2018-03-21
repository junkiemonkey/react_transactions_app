import React, { Component } from 'react';
import { array, func } from 'prop-types';
import { connect } from 'react-redux';
import { removeItem, fetchTransactions, fetchBanks } from '../../actions';
import Table from './components/Table';

@connect(({ transactions }) => transactions, { removeItem, fetchTransactions, fetchBanks })
export default class Transactions extends Component {
  static propTypes = {
    bankList: array,
    itemsList: array,
    removeItem: func,
    fetchBanks: func,
    fetchTransactions: func,
  }

  componentWillMount() {
    const {
      fetchTransactions,
      bankList,
      fetchBanks,
    } = this.props;
    fetchTransactions();
    if (!bankList) fetchBanks();
  }

  removeItem = id => {
    if (window.confirm('Удалить?')) this.props.removeItem(id);
  };

  render() {
    const {
      props: { itemsList, bankList },
      removeItem,
    } = this;

    if (!bankList) return 'Loading...';

    return (
      <div className="transactions text-center">
        <div className="container">
          <h1 className="title">Транзакции</h1>
          <Table handler={removeItem} transactions={itemsList} bankList={bankList} />
        </div>

      </div>
    );
  }
}

