import React, { useState, useEffect } from 'react';

export default function SpreadsheetNew({ data }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [areButtonsVisible, setAreButtonsVisible] = useState(false);
  const [content, setContent] = useState({});
  const [editableField, setEditableField] = useState(null);

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

    // Log the selected row data to the console
    const selectedRowData = data.find((row) => row.id === rowId);
    console.log('Selected Row:', selectedRowData);
  };

  const handleFieldClick = (fieldName) => {
    setEditableField(fieldName);
    setContent((prevContent) => ({ ...prevContent }));
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

    return (
      <td
        onClick={() => handleFieldClick(fieldName)}
        className={selectedRows.includes(rowId) ? 'selected' : ''}
      >
        {isEditing ? (
          <input
            type={dataType === 'currency' || dataType === 'date' ? 'text' : 'text'}
            value={content[fieldName] || ''}
            onChange={(e) => handleContentChange(fieldName, e.target.value, dataType)}
            onBlur={() => handleFieldBlur()}
            onKeyDown={(e) => handleInputKeyDown(fieldName, e, dataType)}
          />
        ) : (
          content[fieldName] || displayValue
        )}
      </td>
    );
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

  const handleMove = () => {
    // Implement the logic to move selected rows
  };

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
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleRowCheckboxChange(row.id)}
                />
              </td>
              {renderEditableCell('date', row.transactionDate, 'date', row.id)}
              {renderEditableCell('description', row.description, 'text', row.id)}
              {renderEditableCell('category', row.category, 'text', row.id)}
              {renderEditableCell('amount', formatCurrency(row.amount), 'currency', row.id)}
              {renderEditableCell('state', row.transactionState, 'text', row.id)}
              {renderEditableCell('type', row.transactionType, 'text', row.id)}
              {renderEditableCell('recurring', row.recurringType, 'text', row.id)}
              {renderEditableCell('notes', row.notes, 'text', row.id)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
