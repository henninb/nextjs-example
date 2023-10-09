import React, { useState, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';
import { useRouter } from 'next/router';
import AddRowOverlay from '../components/AddRowOverlay'

export default function Transactions() {
//export default function Transactions({accountNameOwner="test_brian"}) {
  const [data, setData] = useState([]); // Your spreadsheet data
  const [selectedRows, setSelectedRows] = useState([]);
  const [areButtonsVisible, setAreButtonsVisible] = useState(false);
  const [content, setContent] = useState({});
  const [editableCell, setEditableCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [showAddRowOverlay, setShowAddRowOverlay] = useState(false);

  const router = useRouter();
  const { accountNameOwner } = router.query;

  // Functions to handle data modification, row selection, and pagination
  useEffect(() => {
  const account = 'chase-amazon_brian';
  console.log('accountNameOwner: '+ accountNameOwner);
  fetch(`/api/transactions/${accountNameOwner}`)
  .then((response) => response.json())
  .then((data) => setData(data))
  .catch((error) => console.error('Error fetching data:', error));
  }, [accountNameOwner]);

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

  const handleFieldClick = (fieldName, rowId, displayValue) => {
    setEditableCell({ fieldName, rowId });
    setEditValue(displayValue); // Initialize the edit field with the previous value
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
    if (typeof amount === 'number') {
      return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    } else {
      return 'Invalid amount';
    }
  };

  const renderEditableCell = (fieldName, displayValue, rowId) => {
    const isSelected = selectedRows.includes(rowId);
    const isEditing = editableCell && editableCell.fieldName === fieldName && editableCell.rowId === rowId;


    const handleEscapeKeyPress = (e) => {
      if (e.key === 'Escape') {
        // Revert changes when "Escape" key is pressed
        setEditValue(displayValue);
        setEditableCell(null);
      }
    };

    const handleBlur = () => {
      if (isEditing) {
        handleCellValueChange(editValue, fieldName, rowId);
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleCellValueChange(editValue, fieldName, rowId);
        console.log(editValue);
        //data['fieldName'] = editValue;
        const index = data.findIndex((item) => item.guid === rowId);
        console.log(index)
        const newData = { ...data[index], [fieldName]: editValue };
        console.log(newData)
        //setData(newData)
        //displayValue = editValue;
      }
    };

    return (
      <td
        onClick={() => handleFieldClick(fieldName, rowId, displayValue)}
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
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleEscapeKeyPress} 
                className="dracula-input"
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

  const handleDeleteRows = () => {
    if (selectedRows.length === 0) {
      console.log('No rows selected for deletion');
      return;
    }

    const updatedData = data.filter((row) => !selectedRows.includes(row.guid));
    setData(updatedData);

    setSelectedRows([]); // Clear the selected rows
    setAreButtonsVisible(false);

    console.log(`Deleted rows: ${selectedRows.join(', ')}`);
  };

  // Function to slice the data based on current page and rows per page
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Function to handle changing the number of rows per page
  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to the first page when changing rows per page
  };

  const handleAddRow = (newRowData) => {
    newRowData.guid = uuidv4();
    newRowData.accountNameOwner = accountNameOwner;
    newRowData.activeState = true;
    newRowData.accountType = "credit";
    
    fetch(`/api/transaction/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRowData),
    })
    .then(async (response) => {
      if (!response.ok) {
        const errorMessage = await response.json(); // Parse the error message from the server
        console.log("response is not ok:", errorMessage.error);
        throw new Error(errorMessage.error);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response from the server
      console.log('Data added to the database:', data);
      console.log(newRowData);
      setData((prevData) => [...prevData, newRowData]);
    })
    .catch((error) => {
      console.log('error:', error.message);
      // Handle any errors that occurred during the fetch
      console.error('Error:', error);
    });
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
            <button className="delete-button" onClick={handleDeleteRows}>
              Delete
            </button>
          </>
        ) : (
            <>
         <button className="add-button" 
         onClick={() => setShowAddRowOverlay(true)}>Add</button>
         </>
        )}
      </div>



{showAddRowOverlay ? (
        <AddRowOverlay
          onAddRow={handleAddRow}
          onClose={() => setShowAddRowOverlay(false)}
        />
      ) : (
     <>
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
          {paginatedData.map((row, index) => (
            <tr key={index}>
              {renderEditableCell('selected', null,  row.guid)}
              {renderEditableCell('date', row.transactionDate, row.guid)}
              {renderEditableCell('description', row.description, row.guid)}
              {renderEditableCell('category', row.category, row.guid)}
              {renderEditableCell('amount', formatCurrency(row.amount), row.guid)}
              {renderEditableCell('state', row.transactionState, row.guid)}
              {renderEditableCell('type', row.transactionType, row.guid)}
              {renderEditableCell('recurring', row.reoccurringType, row.guid)}
              {renderEditableCell('notes', row.notes, row.guid)}
            </tr>
          ))}
        </tbody>
      </table>


      
      {/* Rows per page selector */}
      <div className="rows-per-page-selector">
        <label>Show
          <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          records per page
        </label>
      </div>
      
      {/* Pagination controls */}
      <div className="pagination-container">
        <button
          className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      </>
)}

    </div>
  );
}
