import React, { Component } from 'react';
import { func, object, array } from 'prop-types';
import { connect } from 'react-redux';
import { fetchData, fetchBanks } from '../actions';
import { initStorage } from '../utils';
import { TRANSACTIONS, BANKS } from '../constants';

export default WrappedComponent => {
  @connect(({ transactions }) => transactions, { fetchData, fetchBanks })
  class AsyncComponent extends Component {
    static propTypes = {
      fetchBanks: func,
      fetchData: func,
      itemsList: array,
      bankList: array,
    }

    state = {
      data: null,
    }

    async componentWillMount() {
      initStorage();

      const {
        itemsList,
        bankList,
        fetchData,
        fetchBanks,
      } = this.props;

      if (!itemsList) {
        await fetchData();
      }
      if (!bankList) {
        await fetchBanks();
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
