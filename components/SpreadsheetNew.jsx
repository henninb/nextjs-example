import React, { useState, useEffect } from 'react';

export default function SpreadsheetNew({ data }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [areButtonsVisible, setAreButtonsVisible] = useState(false);
  const [content, setContent] = useState({});
  const [editableCell, setEditableCell] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    setAreButtonsVisible(selectedRows.length > 0);
  }, [selectedRows]);

  const handleRowCheckboxChange = (rowId) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowId)) {
        return prevSelectedRows.filter((id) => id !== rowId);
      } else {
        return [...prevSelectedRows, rowId];
      }
    });
  };

  const handleFieldClick = (fieldName, rowId) => {
    setEditableCell({ fieldName, rowId });
  };

  const handleCellValueChange = (value, fieldName, rowId) => {
    setContent((prevContent) => ({
      ...prevContent,
      [rowId]: {
        ...prevContent[rowId],
        [fieldName]: value,
      },
    }));
    setEditableCell(null);
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const renderEditableCell = (fieldName, displayValue, dataType, rowId) => {
    const isSelected = selectedRows.includes(rowId);
    const isEditing = editableCell && editableCell.fieldName === fieldName && editableCell.rowId === rowId;

    const handleBlur = () => {
      if (isEditing) {
        handleCellValueChange(displayValue, fieldName, rowId);
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleCellValueChange(editValue, fieldName, rowId);
      }
    };

    return (
      <td
        onClick={() => handleFieldClick(fieldName, rowId)}
        onBlur={handleBlur}
        className={isEditing ? 'editing' : ''}
      >
        {fieldName === 'selected' ? (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => handleRowCheckboxChange(rowId)}
          />
        ) : (
          <span>
            {isEditing ? (
              <input
                type="text"
                value={content[rowId] && content[rowId][fieldName] || ''}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
              />
            ) : (
              (content[rowId] && content[rowId][fieldName]) || displayValue
            )}
          </span>
        )}
      </td>
    );
  };

  const handleReset = () => {
    if (selectedRows.length === 1) {
      console.log(`Selected row for reset: ${selectedRows[0]}`);
    } else if (selectedRows.length > 1) {
      console.log(`Selected rows for reset: ${selectedRows.join(', ')}`);
    } else {
      console.log('No rows selected for reset');
    }

    setSelectedRows([]);
    setAreButtonsVisible(false);
  };

  const handleDelete = () => {
    if (selectedRows.length === 1) {
      console.log(`Selected row for deletion: ${selectedRows[0]}`);
    } else if (selectedRows.length > 1) {
      console.log(`Selected rows for deletion: ${selectedRows.join(', ')}`);
    } else {
      console.log('No rows selected for deletion');
    }
  };

  const handleAdd = () => {
    console.log('add element');
  };

  const handleMove = () => {
    if (selectedRows.length === 1) {
      console.log(`Selected row for moving: ${selectedRows[0]}`);
    } else if (selectedRows.length > 1) {
      console.log(`Selected rows for moving: ${selectedRows.join(', ')}`);
    } else {
      console.log('No rows selected for moving');
    }
  };

  return (
    <div>
      <div className="button-container">
        {areButtonsVisible ? (
          <>
            <button className="reset-button" onClick={handleReset}>
              Reset
            </button>
            <button className="move-button" onClick={handleMove}>
              Move
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </>
        ) : (
          <button className="add-button" onClick={handleAdd}>
            Add
          </button>
        )}
      </div>

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
            <tr key={index}>
              {renderEditableCell('selected', null, null, row.guid)}
              {renderEditableCell('date', row.transactionDate, 'date', row.guid)}
              {renderEditableCell('description', row.description, 'text', row.guid)}
              {renderEditableCell('category', row.category, 'text', row.guid)}
              {renderEditableCell('amount', formatCurrency(row.amount), 'currency', row.guid)}
              {renderEditableCell('state', row.transactionState, 'text', row.guid)}
              {renderEditableCell('type', row.transactionType, 'text', row.guid)}
              {renderEditableCell('recurring', row.recurringType, 'text', row.guid)}
              {renderEditableCell('notes', row.notes, 'text', row.guid)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
