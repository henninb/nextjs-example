import React, { useState } from 'react';

export default function SpreadsheetRow({ rowData, onDeleteRow, onMoveRow }) {
  const [editableFields, setEditableFields] = useState({});
  const [content, setContent] = useState({ ...rowData });
  const [currentEditableField, setCurrentEditableField] = useState(null);

  const handleFieldClick = (fieldName) => {
    if (!currentEditableField) {
      // Allow only one field to be editable at a time
      setCurrentEditableField(fieldName);
      setEditableFields({ ...editableFields, [fieldName]: true });
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
    if (e.key === 'Enter') {
      // Commit the change when Enter key is pressed
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

  const renderEditableCell = (fieldName, displayValue, dataType) => {
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
      <td onClick={() => handleFieldClick(fieldName)}>
        {content[fieldName] || displayValue}
      </td>
    );
  };

  return (
    <tr>
      <td>
        <input type="checkbox" /> {/* Checkbox for selection */}
      </td>
      {renderEditableCell('date', rowData.transactionDate, 'date')}
      {renderEditableCell('description', rowData.description)}
      {renderEditableCell('category', rowData.category)}
      {renderEditableCell('amount', formatCurrency(rowData.amount), 'currency')}
      {renderEditableCell('state', rowData.transactionState)}
      {renderEditableCell('type', rowData.type)}
      <td>{rowData.reoccurringType}</td>
      <td>{rowData.notes}</td>
      <td>{rowData.image}</td>
      <td>
        <button onClick={() => onDeleteRow(rowData)}>Delete</button> {/* Button for deletion */}
        <button onClick={() => onMoveRow(rowData)}>Move</button> {/* Button for moving */}
      </td>
    </tr>
  );
}
