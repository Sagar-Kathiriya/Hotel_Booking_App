import React, { useState } from 'react';

function GuestForm({ onSubmit, onBack }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter your first and last name.');
      return;
    }

    onSubmit({ firstName: firstName.trim(), lastName: lastName.trim() });
  };

  return (
    <div className="step-content">
      <h2 className="step-title">Guest Information</h2>
      <p className="step-subtitle">Please provide the name for the reservation.</p>

      <form onSubmit={handleSubmit} className="guest-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              className="form-input"
              placeholder="e.g. John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              className="form-input"
              placeholder="e.g. Smith"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="button-row">
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            ← Back
          </button>
          <button type="submit" className="btn btn-primary">
            Continue to Summary →
          </button>
        </div>
      </form>
    </div>
  );
}

export default GuestForm;
