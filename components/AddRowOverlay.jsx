import React, { useState } from 'react';

// Create a component for the overlay form
export default function AddRowOverlay({ onAddRow, onClose }) {
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    category: '',
    amount: '',
    state: '',
    type: '',
    recurring: '',
    notes: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Pass the form data to the parent component
    onAddRow(formData);
    onClose();
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>Add Row</h2>
        <div>
          <label>Date:</label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Recurring:</label>
          <input
            type="text"
            name="recurring"
            value={formData.recurring}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Notes:</label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
          />
        </div>
        <div className="button-container">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}