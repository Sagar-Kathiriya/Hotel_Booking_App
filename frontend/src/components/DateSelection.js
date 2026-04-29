import React, { useState } from 'react';

function DateSelection({ onSubmit }) {
  const today = new Date().toISOString().split('T')[0];
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!checkIn || !checkOut) {
      setError('Please select both check-in and check-out dates.');
      return;
    }

    if (checkOut <= checkIn) {
      setError('Check-out date must be after check-in date.');
      return;
    }

    onSubmit({ checkIn, checkOut });
  };

  const minCheckOut = checkIn
    ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split('T')[0]
    : today;

  return (
    <div className="step-content">
      <h2 className="step-title">Select Your Stay Dates</h2>
      <p className="step-subtitle">Choose your check-in and check-out dates to find available rooms.</p>

      <form onSubmit={handleSubmit} className="date-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="checkIn" className="form-label">
              <span className="label-icon">📅</span> Check-in Date
            </label>
            <input
              id="checkIn"
              type="date"
              className="form-input"
              value={checkIn}
              min={today}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (checkOut && e.target.value >= checkOut) {
                  setCheckOut('');
                }
              }}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="checkOut" className="form-label">
              <span className="label-icon">📅</span> Check-out Date
            </label>
            <input
              id="checkOut"
              type="date"
              className="form-input"
              value={checkOut}
              min={minCheckOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="btn btn-primary btn-full">
          Search Available Rooms →
        </button>
      </form>
    </div>
  );
}

export default DateSelection;
