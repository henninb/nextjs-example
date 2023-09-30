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
        <form>
          <div className="form-row">
            <div className="form-group col text-left">
              <label htmlFor="date">Date:</label>
              <input
                type="text"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="form-control text-left"
              />
            </div>
            <div className="form-group col text-left">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-control text-left"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col text-left">
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-control text-left"
              />
            </div>
            <div className="form-group col text-left">
              <label htmlFor="amount">Amount:</label>
              <input
                type="text"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="form-control text-left smaller-input"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col text-left">
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="form-control text-left"
              />
            </div>
            <div className="form-group col text-left">
              <label htmlFor="type">Type:</label>
              <input
                type="text"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="form-control text-left"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col text-left">
              <label htmlFor="recurring">Recurring:</label>
              <input
                type="text"
                id="recurring"
                name="recurring"
                value={formData.recurring}
                onChange={handleInputChange}
                className="form-control text-left smaller-input"
              />
            </div>
            <div className="form-group col text-left">
              <label htmlFor="notes">Notes:</label>
              <input
                type="text"
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="form-control text-left"
              />
            </div>
          </div>
          <div className="button-container">
            <button type="button" onClick={handleSave} className="btn btn-primary">Save</button>
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
