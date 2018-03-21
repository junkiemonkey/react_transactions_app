import React, { Component } from 'react';
import { array, func } from 'prop-types';
import { connect } from 'react-redux';
import withData from '../../decorators/with_data';
import { removeItem } from '../../actions';
import Table from './components/Table';

@withData
@connect(({ transactions }) => transactions, { removeItem })
export default class Transactions extends Component {
  static propTypes = {
    bankList: array,
    itemsList: array,
    removeItem: func,
  }

  removeItem = id => {
    if (window.confirm('Удалить?')) this.props.removeItem(id);
  };

  render() {
    const {
      props: { itemsList, bankList },
      removeItem,
    } = this;

    return (
      <div className="transactions text-center">
        <div className="container">
          <h1 className="title">Транзакции</h1>
          <Table handler={removeItem} data={itemsList} banks={bankList} />
        </div>

      </div>
    );
  }
}

