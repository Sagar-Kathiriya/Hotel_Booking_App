import React from 'react';

function Confirmation({ confirmation, onStartOver }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  return (
    <div className="step-content confirmation-content">
      <div className="confirmation-icon">🎉</div>
      <h2 className="step-title confirmation-title">Booking Confirmed!</h2>
      <p className="step-subtitle">
        Your reservation has been successfully created. We look forward to welcoming you!
      </p>

      <div className="reservation-number-card">
        <p className="reservation-label">Your Reservation Number</p>
        <p className="reservation-number">{confirmation.reservationNumber}</p>
        <p className="reservation-hint">Please keep this number for your records.</p>
      </div>

      <div className="summary-card">
        <div className="summary-section">
          <h3 className="summary-section-title">🏨 Room</h3>
          <div className="summary-row">
            <span className="summary-label">Room Type</span>
            <span className="summary-value">{confirmation.roomName}</span>
          </div>
        </div>

        <div className="summary-divider" />

        <div className="summary-section">
          <h3 className="summary-section-title">📅 Stay Details</h3>
          <div className="summary-row">
            <span className="summary-label">Check-in</span>
            <span className="summary-value">{formatDate(confirmation.checkIn)}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Check-out</span>
            <span className="summary-value">{formatDate(confirmation.checkOut)}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Nights</span>
            <span className="summary-value">{confirmation.numberOfNights}</span>
          </div>
        </div>

        <div className="summary-divider" />

        <div className="summary-section">
          <h3 className="summary-section-title">👤 Guest</h3>
          <div className="summary-row">
            <span className="summary-label">Name</span>
            <span className="summary-value">
              {confirmation.guestFirstName} {confirmation.guestLastName}
            </span>
          </div>
        </div>

        <div className="summary-divider" />

        <div className="summary-section">
          <h3 className="summary-section-title">💰 Total Paid</h3>
          <div className="summary-row total-row">
            <span className="summary-label total-label">Total Price</span>
            <span className="summary-value total-price">
              CHF {Number(confirmation.totalPrice).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <button className="btn btn-primary btn-full" onClick={onStartOver}>
        Make Another Booking
      </button>
    </div>
  );
}

export default Confirmation;
