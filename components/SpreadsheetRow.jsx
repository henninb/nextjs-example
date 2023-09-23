import React, { useState } from 'react';

const SpreadsheetRow = ({ rowData }) => {

  const [editableFields, setEditableFields] = useState({});

  const handleFieldClick = (fieldName) => {
    setEditableFields({ ...editableFields, [fieldName]: true });
  };

  const handleFieldBlur = (fieldName) => {
    setEditableFields({ ...editableFields, [fieldName]: false });
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const {
    transactionDate,
    description,
    category,
    amount,
    transactionState,
    type,
    reoccurringType,
    notes,
    image,
  } = rowData;

  return (
    <tr>

      <td
        onClick={() => handleFieldClick('date')}
        onBlur={() => handleFieldBlur('date')}
        contentEditable={editableFields['date']}
      >
        {transactionDate}
      </td>

      <td
        onClick={() => handleFieldClick('description')}
        onBlur={() => handleFieldBlur('description')}
        contentEditable={editableFields['description']}
      >
        {description}
      </td>

      <td
        onClick={() => handleFieldClick('category')}
        onBlur={() => handleFieldBlur('category')}
        contentEditable={editableFields['category']}
      >
        {category}
      </td>

      <td
        onClick={() => handleFieldClick('amount')}
        onBlur={() => handleFieldBlur('amount')}
        contentEditable={editableFields['amount']}
      >
        {formatCurrency(amount)}
      </td>

      <td
        onClick={() => handleFieldClick('state')}
        onBlur={() => handleFieldBlur('state')}
        contentEditable={editableFields['state']}
      >
        {transactionState}
      </td>

      <td
        onClick={() => handleFieldClick('type')}
        onBlur={() => handleFieldBlur('type')}
        contentEditable={editableFields['type']}
      >
        {type}
      </td>

      <td>{reoccurringType}</td>
      <td>{notes}</td>
      <td>{image}</td>
      <td>
        <button>Delete</button>
        <button>Edit</button>
      </td>
    </tr>
  );
};

export default SpreadsheetRow;
