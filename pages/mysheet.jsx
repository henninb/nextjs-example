import React, { useState, useEffect } from 'react';
import Spreadsheet from '../components/Spreadsheet';

export default function MySheet () {
  const [data, setData] = useState([]); // Your spreadsheet data
  const [selectedRows, setSelectedRows] = useState([]); // Selected rows
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 50;

  // Functions to handle data modification, row selection, and pagination
  useEffect(() => {
    // Fetch data from your API endpoint
    fetch('/api/transactions') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <Spreadsheet data={data} />
      {/* Pagination controls */}
    </div>
  );
};
