import React, { useState, useEffect } from 'react';
import { getAvailableRooms } from '../services/api';

function RoomSelection({ checkIn, checkOut, onSelect, onBack }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getAvailableRooms(checkIn, checkOut)
      .then((res) => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load rooms. Please try again.');
        setLoading(false);
      });
  }, [checkIn, checkOut]);

  const nights = Math.round(
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
  );

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const roomIcons = {
    STANDARD: '🛏️',
    DELUXE: '🌊',
  };

  const roomBadges = {
    STANDARD: { label: 'Standard', color: '#3b82f6' },
    DELUXE: { label: 'Deluxe', color: '#8b5cf6' },
  };

  return (
    <div className="step-content">
      <h2 className="step-title">Available Rooms</h2>
      <div className="date-summary">
        <span>📅 {formatDate(checkIn)} → {formatDate(checkOut)}</span>
        <span className="nights-badge">{nights} night{nights !== 1 ? 's' : ''}</span>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Checking availability...</p>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <div className="rooms-list">
          {rooms.map((room) => (
            <div
              key={room.type}
              className={`room-card ${room.availableRooms === 0 ? 'room-unavailable' : ''}`}
            >
              <div className="room-header">
                <div className="room-icon">{roomIcons[room.type] || '🏨'}</div>
                <div className="room-info">
                  <div className="room-name-row">
                    <h3 className="room-name">{room.name}</h3>
                    <span
                      className="room-badge"
                      style={{ backgroundColor: roomBadges[room.type]?.color }}
                    >
                      {roomBadges[room.type]?.label}
                    </span>
                  </div>
                  <p className="room-description">{room.description}</p>
                </div>
              </div>

              <div className="room-footer">
                <div className="room-pricing">
                  <span className="price-per-night">
                    CHF {Number(room.pricePerNight).toFixed(2)}
                    <span className="per-night-label">/night</span>
                  </span>
                  <span className="total-estimate">
                    Total: CHF {(Number(room.pricePerNight) * nights).toFixed(2)}
                  </span>
                </div>
                <div className="room-availability-info">
                  {room.availableRooms > 0 ? (
                    <>
                      <span className="availability-badge available">
                        {room.availableRooms} room{room.availableRooms !== 1 ? 's' : ''} left
                      </span>
                      <button
                        className="btn btn-primary"
                        onClick={() => onSelect(room)}
                      >
                        Select
                      </button>
                    </>
                  ) : (
                    <span className="availability-badge unavailable">Sold Out</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="btn btn-secondary" onClick={onBack}>
        ← Change Dates
      </button>
    </div>
  );
}

export default RoomSelection;
