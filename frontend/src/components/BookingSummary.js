import React, { useState } from 'react';
import { createBooking } from '../services/api';

function BookingSummary({ checkIn, checkOut, selectedRoom, guestInfo, onConfirm, onBack }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const nights = Math.round(
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
  );
  const totalPrice = (Number(selectedRoom.pricePerNight) * nights).toFixed(2);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const handleConfirm = () => {
    setLoading(true);
    setError('');

    createBooking({
      roomType: selectedRoom.type,
      checkIn,
      checkOut,
      firstName: guestInfo.firstName,
      lastName: guestInfo.lastName,
    })
      .then((res) => {
        setLoading(false);
        onConfirm(res.data);
      })
      .catch((err) => {
        setLoading(false);
        const msg =
          err.response?.data?.error || 'Booking failed. Please try again.';
        setError(msg);
      });
  };

  return (
    <div className="step-content">
      <h2 className="step-title">Booking Summary</h2>
      <p className="step-subtitle">Please review your reservation details before confirming.</p>

      <div className="summary-card">
        <div className="summary-section">
          <h3 className="summary-section-title">🏨 Room</h3>
          <div className="summary-row">
            <span className="summary-label">Room Type</span>
            <span className="summary-value">{selectedRoom.name}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Description</span>
            <span className="summary-value summary-description">{selectedRoom.description}</span>
          </div>
        </div>

        <div className="summary-divider" />

        <div className="summary-section">
          <h3 className="summary-section-title">📅 Stay Details</h3>
          <div className="summary-row">
            <span className="summary-label">Check-in</span>
            <span className="summary-value">{formatDate(checkIn)}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Check-out</span>
            <span className="summary-value">{formatDate(checkOut)}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Duration</span>
            <span className="summary-value">{nights} night{nights !== 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="summary-divider" />

        <div className="summary-section">
          <h3 className="summary-section-title">👤 Guest</h3>
          <div className="summary-row">
            <span className="summary-label">Name</span>
            <span className="summary-value">{guestInfo.firstName} {guestInfo.lastName}</span>
          </div>
        </div>

        <div className="summary-divider" />

        <div className="summary-section">
          <h3 className="summary-section-title">💰 Pricing</h3>
          <div className="summary-row">
            <span className="summary-label">Price per Night</span>
            <span className="summary-value">CHF {Number(selectedRoom.pricePerNight).toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Number of Nights</span>
            <span className="summary-value">{nights}</span>
          </div>
          <div className="summary-row total-row">
            <span className="summary-label total-label">Total Price</span>
            <span className="summary-value total-price">CHF {totalPrice}</span>
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="button-row">
        <button className="btn btn-secondary" onClick={onBack} disabled={loading}>
          ← Edit Guest Info
        </button>
        <button className="btn btn-success" onClick={handleConfirm} disabled={loading}>
          {loading ? (
            <span><span className="btn-spinner"></span> Processing...</span>
          ) : (
            '✓ Confirm Booking'
          )}
        </button>
      </div>
    </div>
  );
}

export default BookingSummary;
