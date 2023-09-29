import React, { useState, useEffect } from 'react';

export default function SpreadsheetNew({ data }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [areButtonsVisible, setAreButtonsVisible] = useState(false);
  const [content, setContent] = useState({});
  const [editableField, setEditableField] = useState(null);
  const [editValue, setEditValue] = useState(''); // Added state for editing value

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

  const handleFieldClick = (fieldName, displayValue) => {
    setEditableField(fieldName);
    setEditValue(displayValue); // Set the value for editing
  };

  const handleFieldBlur = () => {
    setEditableField(null);
  };

  const handleContentChange = (fieldName, newValue, dataType) => {
    if (dataType === 'currency' && !isNaN(newValue)) {
      setContent((prevContent) => ({ ...prevContent, [fieldName]: newValue }));
    } else if (dataType === 'date' && /^\d{4}-\d{2}-\d{2}$/.test(newValue)) {
      setContent((prevContent) => ({ ...prevContent, [fieldName]: newValue }));
    } else {
      setContent((prevContent) => ({ ...prevContent, [fieldName]: newValue }));
    }
  };

  const handleInputKeyDown = (fieldName, e, dataType) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      handleFieldBlur();
    } else if (e.key === 'Escape') {
      setContent((prevContent) => ({ ...prevContent }));
      handleFieldBlur();
    }
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const renderEditableCell = (fieldName, displayValue, dataType, rowId) => {
    const isEditing = editableField === fieldName;
    const isSelected = selectedRows.includes(rowId);

    return (
      <td
        onClick={() => handleFieldClick(fieldName, displayValue)}
        className={isEditing ? 'editing' : ''}
      >
        {fieldName === 'selected' ? (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => handleRowCheckboxChange(rowId)}
          />
        ) : (
          isEditing ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={() => {
                handleContentChange(fieldName, editValue, dataType);
                handleFieldBlur();
              }}
              onKeyDown={(e) => handleInputKeyDown(fieldName, e, dataType)}
            />
          ) : (
            fieldName === 'selected' ? (isSelected ? 'x' : null) : (content[fieldName] || displayValue)
          )
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

    // Uncheck all selected rows
    setSelectedRows([]);
    // Hide the buttons
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
    // Implement your add logic here
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
            <button className="reset-button" onClick={handleReset}>Reset</button>
            <button className="move-button" onClick={handleMove}>Move</button>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
          </>
        ) : (
          <button className="add-button" onClick={handleAdd}>Add</button>
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
