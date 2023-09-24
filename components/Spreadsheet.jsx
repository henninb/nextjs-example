import React, { useState, useEffect } from 'react';
import SpreadsheetRow from './SpreadsheetRow';

export default function Spreadsheet({ data }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [areButtonsVisible, setAreButtonsVisible] = useState(false);

  const handleDelete = () => {
    // Implement the logic to delete selected rows
  };

  const handleMove = () => {
    // Implement the logic to move selected rows
  };

  const toggleRowSelection = (rowId) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowId)) {
        // If row is already selected, deselect it
        return prevSelectedRows.filter((id) => id !== rowId);
      } else {
        // If row is not selected, select it
        return [...prevSelectedRows, rowId];
      }
    });
  };

  useEffect(() => {
    // Update button visibility when selectedRows change
    setAreButtonsVisible(selectedRows.length > 0);
  }, [selectedRows]);

  return (
    <div>
      {areButtonsVisible && (
        <div className="button-container">
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleMove}>Move</button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>State</th>
            <th>Type</th>
            <th>Recurring</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <SpreadsheetRow
              key={index}
              rowData={row}
              toggleRowSelection={toggleRowSelection}
              isSelected={selectedRows.includes(row.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
