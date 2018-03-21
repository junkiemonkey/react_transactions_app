import React, { Component } from 'react';
import { func, object, array } from 'prop-types';
import { connect } from 'react-redux';
import { fetchTransactions, fetchBanks } from '../actions';
import { initStorage } from '../utils';

export default WrappedComponent => {
  @connect(({ transactions }) => transactions, { fetchTransactions, fetchBanks })
  class AsyncComponent extends Component {
    static propTypes = {
      fetchBanks: func,
      fetchTransactions: func,
      itemsList: array,
      bankList: array,
    }

    state = {
      data: null,
    }

    componentWillMount() {
      initStorage();

      const {
        itemsList,
        bankList,
        fetchTransactions,
        fetchBanks,
      } = this.props;

      if (!itemsList) {
        fetchTransactions();
      }
      if (!bankList) {
        fetchBanks();
        return null;
      }
      this.setState({ data: true });
    }

    componentWillReceiveProps(props) {
      const { itemsList, bankList } = props;
      if (itemsList && bankList) {
        this.setState({ data: true });
      }
    }

    render() {
      const { data } = this.state;
      if (!data) {
        return 'Loading...';
      }
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }
  return AsyncComponent;
};
