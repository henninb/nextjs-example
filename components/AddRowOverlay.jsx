import React, { useState, useEffect } from 'react';

export default function AddRowOverlay({ onAddRow, onClose }) {
  const initialFormData = {
    date: '',
    description: '',
    category: '',
    amount: '',
    state: '',
    type: '',
    recurring: '',
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

  const handleSave = () => {
    // Pass the form data to the parent component
    onAddRow(formData);
    onClose();
  };


    // Add an event listener for the 'keydown' event
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.keyCode === 27) { // Check if the pressed key is the Escape key (key code 27)
          onClose(); // Close the overlay
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
    <section>
    <div className="overlay">
      <div className="overlay-content">
        <h2>Add Row</h2>
        <form>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="text"
              id="date"
              name="date"
              placeholder="date"
              value={formData.date}
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
            <input
              type="text"
              id="state"
              name="state"
              placeholder="state"
              value={formData.state}
              onChange={handleInputChange}
              className="dracula-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <input
              type="text"
              id="type"
              name="type"
              placeholder="type"
              value={formData.type}
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
              value={formData.recurring}
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
            <button type="button" onClick={handleSave} className="btn btn-primary">Save</button>
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
    </section>
  );
}
