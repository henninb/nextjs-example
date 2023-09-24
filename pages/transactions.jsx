import React, { useState, useEffect } from 'react';
import Spreadsheet from '../components/SpreadsheetNew';

export default function MySheet() {
  const [data, setData] = useState([]); // Your spreadsheet data
  const [selectedRows, setSelectedRows] = useState([]); // Selected rows
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // 10 records per page

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

  return (
    <div>
      <Spreadsheet data={paginatedData} />
      {/* Pagination controls */}
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
