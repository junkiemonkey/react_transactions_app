import React from 'react';
import { func, array } from 'prop-types';

const Table = ({ handler, data, banks }) => {
  const sortFunc = (a, b) => a.id - b.id;
  const getBankById = id => banks.filter(_item => _item.id === id)[0].value;

  return (
    <table className="transactions__table">
      <tbody>
        <tr>
          <th>ID</th>
          <th>Bank</th>
          <th>Amount</th>
          <th />
        </tr>
        {data.sort(sortFunc).map(_item => (
          <tr key={_item.id}>
            <td>{_item.id}</td>
            <td>{getBankById(+_item.bankId)}</td>
            <td>{_item.amount} RUB</td>
            <td><button type="button" onClick={() => handler(_item.id)}>Удалить</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  banks: array,
  data: array,
  handler: func,
};

export default Table;
