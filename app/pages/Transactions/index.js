import React, { Component } from 'react';
import { array, func } from 'prop-types';
import { connect } from 'react-redux';
import withData from '../../decorators/with_data';
import withUser from '../../decorators/with_user';
import { removeItem } from '../../actions';

@withUser
@withData
@connect(({ transactions }) => transactions, { removeItem })
export default class Transactions extends Component {
  static propTypes = {
    bankList: array,
    itemsList: array,
    removeItem: func,
  }

  getBankById = id => this.props.bankList.filter(_item => _item.id === id)[0].value;

  removeItem = id => {
    if (window.confirm('Удалить?')) this.props.removeItem(id);
  };

  sortFunc = (a, b) => a.id - b.id;

  render() {
    const {
      props: { itemsList },
      getBankById,
      removeItem,
      sortFunc,
    } = this;

    return (
      <div className="transactions text-center">
        <div className="container">
          <h1 className="title">Транзакции</h1>

          <table className="transactions__table">
            <tbody>
            <tr>
              <th>ID</th>
              <th>Bank</th>
              <th>Amount</th>
              <th />
            </tr>
            {itemsList.sort(sortFunc).map(_item => (
              <tr key={_item.id}>
                <td>{_item.id}</td>
                <td>{getBankById(+_item.bankId)}</td>
                <td>{_item.amount} RUB</td>
                <td><button type="button" onClick={() => removeItem(_item.id)}>Удалить</button></td>
              </tr>
            ))}
            </tbody>

          </table>
        </div>

      </div>
    );
  }
}

