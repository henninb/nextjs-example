import React, { useState, useEffect } from 'react';

export default function AddRowOverlay({ onAddRow, onClose }) {
  const initialFormData = {
    transactionDate: '10/06/2023',
    description: '',
    category: '',
    amount: 0.00,
    transactionState: 'cleared',
    transactionType: 'undefined',
    reoccurringType: 'onetime',
    notes: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleCurrencyChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: name === 'amount' ? formatCurrencyInput(value) : value,
  //   }));
  // };

  // const formatCurrencyInput = (inputValue) => {
  //   // Remove any non-numeric characters from the input
  //   const numericValue = inputValue.replace(/[^0-9.]/g, '');

  //   // Format the numeric value as currency (e.g., 12345.67 -> "$12,345.67")
  //   const formattedValue = parseFloat(numericValue).toLocaleString('en-US', {
  //     style: 'currency',
  //     currency: 'USD', // Change to your desired currency code
  //   });

  //   return formattedValue;
  // };

  const handleSave = () => {
    // Pass the form data to the parent component
    onAddRow(formData);
    onClose();
  };

  // Add an event listener for the 'keydown' event
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>Add Row</h2>
        <form>
          <div className="form-group">
            <label htmlFor="date">Date:</label>

            <input
              type="date"
              id="date"
              name="date"
              value={formData.transactionDate}
              onChange={handleInputChange}
              className="dracula-input"
            />


          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="description"
              value={formData.description}
              onChange={handleInputChange}
              className="dracula-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="category"
              value={formData.category}
              onChange={handleInputChange}
              className="dracula-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              type="text"
              id="amount"
              name="amount"
              placeholder="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="dracula-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">State:</label>
            <select
              id="state"
              name="state"
              value={formData.transactionState}
              onChange={handleInputChange}
              className="dracula-input"
            >
              <option value="future">Future</option>
              <option value="outstanding">Outstanding</option>
              <option value="cleared">Cleared</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <input
              type="text"
              id="type"
              name="type"
              placeholder="type"
              value={formData.transactionType}
              onChange={handleInputChange}
              className="dracula-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="recurring">Recurring:</label>
            <input
              type="text"
              id="recurring"
              name="recurring"
              placeholder="reocurring"
              value={formData.reoccurringType}
              onChange={handleInputChange}
              className="dracula-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes:</label>
            <input
              type="text"
              id="notes"
              name="notes"
              placeholder="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="dracula-input"
            />
          </div>
          <div className="button-container">
            <button type="button" onClick={handleSave} className="save-button">
              Save
            </button>
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
