import React, { useState } from 'react';

export default function SpreadsheetRow({ rowData }) {
  const [editableFields, setEditableFields] = useState({});
  const [content, setContent] = useState({ ...rowData });

  const handleFieldClick = (fieldName) => {
    setEditableFields({ ...editableFields, [fieldName]: true });
  };

  const handleFieldBlur = (fieldName) => {
    setEditableFields({ ...editableFields, [fieldName]: false });
  };

  const handleContentChange = (fieldName, newValue) => {
    setContent({ ...content, [fieldName]: newValue });
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const renderEditableCell = (fieldName, displayValue) => {
    return editableFields[fieldName] ? (
      <td onBlur={() => handleFieldBlur(fieldName)}>
        <input
          type="text"
          value={content[fieldName]}
          onChange={(e) => handleContentChange(fieldName, e.target.value)}
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
      {renderEditableCell('date', rowData.transactionDate)}
      {renderEditableCell('description', rowData.description)}
      {renderEditableCell('category', rowData.category)}
      {renderEditableCell('amount', formatCurrency(rowData.amount))}
      {renderEditableCell('state', rowData.transactionState)}
      {renderEditableCell('type', rowData.type)}
      <td>{rowData.reoccurringType}</td>
      <td>{rowData.notes}</td>
      <td>{rowData.image}</td>
      <td>
        <button>Delete</button>
      </td>
    </tr>
  );
}