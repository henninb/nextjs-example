import React, { useState, useEffect } from 'react';

export default function SpreadsheetNew({ data }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [areButtonsVisible, setAreButtonsVisible] = useState(false);
  const [selectedRowIdsForDeletion, setSelectedRowIdsForDeletion] = useState([]);

  const handleDelete = () => {
    if (selectedRowIdsForDeletion.length === 1) {
      // Display the row ID when there is only one selected row for deletion
      console.log(`Selected row for deletion: ${selectedRowIdsForDeletion[0]}`);
    } else if (selectedRowIdsForDeletion.length > 1) {
      // Display selected rows for deletion when there are multiple selected rows
      console.log(`Selected rows for deletion: ${selectedRowIdsForDeletion.join(', ')}`);
    } else {
      console.log('No rows selected for deletion');
    }
  };

  const handleMove = () => {
    // Implement the logic to move selected rows
  };

  useEffect(() => {
    // Update button visibility when selectedRows change
    setAreButtonsVisible(selectedRows.length > 0);
    // Update the selectedRowIdsForDeletion whenever selectedRows change
    setSelectedRowIdsForDeletion(selectedRows);
  }, [selectedRows]);

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

  const [editableField, setEditableField] = useState(null);
  const [content, setContent] = useState({});

  const handleFieldClick = (fieldName) => {
    setEditableField(fieldName);
    // Store the original content when starting to edit
    setContent((prevContent) => ({ ...prevContent }));
  };

  const handleFieldBlur = () => {
    setEditableField(null);
  };

  const handleContentChange = (fieldName, newValue, dataType) => {
    if (dataType === 'currency') {
      // Ensure newValue is numeric for currency field
      if (!isNaN(newValue)) {
        setContent((prevContent) => ({ ...prevContent, [fieldName]: newValue }));
      }
    } else if (dataType === 'date') {
      // Ensure newValue is a valid date format (you can customize this validation)
      if (/^\d{4}-\d{2}-\d{2}$/.test(newValue)) {
        setContent((prevContent) => ({ ...prevContent, [fieldName]: newValue }));
      }
    } else {
      setContent((prevContent) => ({ ...prevContent, [fieldName]: newValue }));
    }
  };

  const handleInputKeyDown = (fieldName, e, dataType) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      // Commit the change when Enter key or Tab key is pressed
      handleFieldBlur();
    } else if (e.key === 'Escape') {
      // Revert to the original value when Escape key is pressed
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
    
    return isEditing ? (
      <td onBlur={() => handleFieldBlur()}>
        <input
          type={dataType === 'currency' || dataType === 'date' ? 'text' : 'text'}
          value={content[fieldName] || ''}
          onChange={(e) =>
            handleContentChange(fieldName, e.target.value, dataType)
          }
          onKeyDown={(e) => handleInputKeyDown(fieldName, e, dataType)}
        />
      </td>
    ) : (
      <td
        onClick={() => handleFieldClick(fieldName)}
        className={selectedRows.includes(rowId) ? 'selected' : ''}
      >
        {content[fieldName] || displayValue}
      </td>
    );
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
                  onChange={() => toggleRowSelection(row.id)}
                />
                {/* Checkbox for selection */}
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
