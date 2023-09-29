import React, { useState, useEffect } from 'react';
import Spreadsheet from '../components/SpreadsheetNew';

export default function MySheet() {
  const [data, setData] = useState([]); // Your spreadsheet data
  const [selectedRows, setSelectedRows] = useState([]); // Selected rows
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Initialize with 10 records per page

  // Functions to handle data modification, row selection, and pagination
  useEffect(() => {
    // Fetch data from your API endpoint
    fetch('/api/transactions') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

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

  return (
    <div>
      <Spreadsheet data={paginatedData} />
      {/* Rows per page selector */}
      
      <div className="rows-per-page-selector">
        <label>Show
          <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            {/* Add more options as needed */}
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
    </div>
  );
}
