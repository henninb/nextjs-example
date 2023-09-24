import React, { useState, useEffect } from 'react';

export default function SpreadsheetRow({ rowData, onDeleteRow, onMoveRow }) {
  const [editableFields, setEditableFields] = useState({});
  const [content, setContent] = useState({ ...rowData });
  const [currentEditableField, setCurrentEditableField] = useState(null);
  const [originalContent, setOriginalContent] = useState({ ...rowData });
  const [selectedRows, setSelectedRows] = useState([]);

  // const handleFieldClick = (fieldName) => {
  //   if (!currentEditableField) {
  //     // Allow only one field to be editable at a time
  //     setCurrentEditableField(fieldName);
  //     setEditableFields({ ...editableFields, [fieldName]: true });
  //     // Store the original content when starting to edit
  //     setOriginalContent({ ...content });
  //   }
  // };


  const handleFieldClick = (fieldName) => {
    if (!currentEditableField) {
      // Allow only one field to be editable at a time
      setCurrentEditableField(fieldName);
      setEditableFields({ [fieldName]: true });
      // Store the original content when starting to edit
      setOriginalContent({ ...content });
    } else if (currentEditableField === fieldName) {
      // If the same field is clicked again, it should remain in edit mode
      // No need to do anything here
    } else {
      // Another field is already in edit mode, so we should not allow this field to be edited
      return;
    }
  };

  const handleFieldBlur = (fieldName) => {
    setCurrentEditableField(null);
    setEditableFields({ ...editableFields, [fieldName]: false });
  };

  const handleContentChange = (fieldName, newValue, dataType) => {
    if (dataType === 'currency') {
      // Ensure newValue is numeric for currency field
      if (!isNaN(newValue)) {
        setContent({ ...content, [fieldName]: newValue });
      }
    } else if (dataType === 'date') {
      // Ensure newValue is a valid date format (you can customize this validation)
      if (/^\d{4}-\d{2}-\d{2}$/.test(newValue)) {
        setContent({ ...content, [fieldName]: newValue });
      }
    } else {
      setContent({ ...content, [fieldName]: newValue });
    }
  };

  const handleInputKeyDown = (fieldName, e, dataType) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      // Commit the change when Enter key is pressed
      handleFieldBlur(fieldName);
    } else if (e.key === 'Escape') {
      // Revert to the original value when Escape key is pressed
      setContent({ ...originalContent });
      handleFieldBlur(fieldName);
    }
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const transactionStates = ['cleared', 'Completed', 'Canceled'];

  const toggleRowSelection = (rowId) => {
    if (selectedRows.includes(rowId)) {
      // If row is already selected, deselect it
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      // If row is not selected, select it
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const isRowSelected = (rowId) => {
    return selectedRows.includes(rowId);
  };

  const renderEditableCell = (fieldName, displayValue, dataType, rowId) => {
    return editableFields[fieldName] ? (
      <td onBlur={() => handleFieldBlur(fieldName)}>
        <input
          type={dataType === 'currency' || dataType === 'date' ? 'text' : 'text'}
          value={content[fieldName]}
          onChange={(e) =>
            handleContentChange(fieldName, e.target.value, dataType)
          }
          onKeyDown={(e) => handleInputKeyDown(fieldName, e, dataType)}
        />
      </td>
    ) : (
      <td
        onClick={() => {
          handleFieldClick(fieldName);
          toggleRowSelection(rowId);
        }}
        className={isRowSelected(rowId) ? 'selected' : ''}
      >
        {content[fieldName] || displayValue}
      </td>
    );
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={isRowSelected(rowData.id)}
          onChange={() => toggleRowSelection(rowData.id)}
        />{" "}
        {/* Checkbox for selection */}
      </td>
      {renderEditableCell('date', rowData.transactionDate, 'date', rowData.id)}
      {renderEditableCell('description', rowData.description, 'text', rowData.id)}
      {renderEditableCell('category', rowData.category, 'text', rowData.id)}
      {renderEditableCell(
        'amount',
        formatCurrency(rowData.amount),
        'currency',
        rowData.id
      )}
      {renderEditableCell('state', rowData.transactionState, 'text', rowData.id)}
      {renderEditableCell('type', rowData.trasactionType, 'text', rowData.id)}
      {renderEditableCell('reocur', rowData.reoccurringType, 'text', rowData.id)}
      {renderEditableCell('notes', rowData.notes, 'text', rowData.id)}
      <td>{rowData.image}</td>
      <td>
        <button onClick={() => onDeleteRow(rowData)}>Delete</button>{" "}
        {/* Button for deletion */}
        <button onClick={() => onMoveRow(rowData)}>Move</button>{" "}
        {/* Button for moving */}
      </td>
    </tr>
  );
}
