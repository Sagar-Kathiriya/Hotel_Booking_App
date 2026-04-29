import React, { useState } from 'react';
import DateSelection from './components/DateSelection';
import RoomSelection from './components/RoomSelection';
import GuestForm from './components/GuestForm';
import BookingSummary from './components/BookingSummary';
import Confirmation from './components/Confirmation';
import './App.css';

const STEPS = {
  DATE_SELECTION: 1,
  ROOM_SELECTION: 2,
  GUEST_FORM: 3,
  BOOKING_SUMMARY: 4,
  CONFIRMATION: 5,
};

function App() {
  const [step, setStep] = useState(STEPS.DATE_SELECTION);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [guestInfo, setGuestInfo] = useState({ firstName: '', lastName: '' });
  const [confirmation, setConfirmation] = useState(null);

  const handleDateSubmit = (dates) => {
    setCheckIn(dates.checkIn);
    setCheckOut(dates.checkOut);
    setStep(STEPS.ROOM_SELECTION);
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setStep(STEPS.GUEST_FORM);
  };

  const handleGuestSubmit = (info) => {
    setGuestInfo(info);
    setStep(STEPS.BOOKING_SUMMARY);
  };

  const handleBookingConfirmed = (confirmationData) => {
    setConfirmation(confirmationData);
    setStep(STEPS.CONFIRMATION);
  };

  const handleStartOver = () => {
    setStep(STEPS.DATE_SELECTION);
    setCheckIn('');
    setCheckOut('');
    setSelectedRoom(null);
    setGuestInfo({ firstName: '', lastName: '' });
    setConfirmation(null);
  };

  const stepLabels = ['Select Dates', 'Choose Room', 'Guest Info', 'Summary'];

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="hotel-logo">🏨</div>
          <div>
            <h1 className="hotel-name">HSLU City Hotel</h1>
            <p className="hotel-tagline">Your premium stay in the heart of the city</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        {step !== STEPS.CONFIRMATION && (
          <div className="stepper">
            {stepLabels.map((label, index) => (
              <div
                key={index}
                className={`step ${step === index + 1 ? 'active' : ''} ${step > index + 1 ? 'completed' : ''}`}
              >
                <div className="step-circle">
                  {step > index + 1 ? '✓' : index + 1}
                </div>
                <span className="step-label">{label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="content-card">
          {step === STEPS.DATE_SELECTION && (
            <DateSelection onSubmit={handleDateSubmit} />
          )}
          {step === STEPS.ROOM_SELECTION && (
            <RoomSelection
              checkIn={checkIn}
              checkOut={checkOut}
              onSelect={handleRoomSelect}
              onBack={() => setStep(STEPS.DATE_SELECTION)}
            />
          )}
          {step === STEPS.GUEST_FORM && (
            <GuestForm
              onSubmit={handleGuestSubmit}
              onBack={() => setStep(STEPS.ROOM_SELECTION)}
            />
          )}
          {step === STEPS.BOOKING_SUMMARY && (
            <BookingSummary
              checkIn={checkIn}
              checkOut={checkOut}
              selectedRoom={selectedRoom}
              guestInfo={guestInfo}
              onConfirm={handleBookingConfirmed}
              onBack={() => setStep(STEPS.GUEST_FORM)}
            />
          )}
          {step === STEPS.CONFIRMATION && (
            <Confirmation
              confirmation={confirmation}
              onStartOver={handleStartOver}
            />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2024 HSLU City Hotel · All rights reserved</p>
      </footer>
    </div>
  );
}

export default App;
