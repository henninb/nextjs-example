import React from 'react';
import SpreadsheetRow from './SpreadsheetRow'

const Spreadsheet = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
          <th>State</th>
          <th>Type</th>
          <th>Recurring</th>
          <th>Notes</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <SpreadsheetRow key={index} rowData={row} />
        ))}
      </tbody>
    </table>
  );
};

export default Spreadsheet;
