// src/components/AppointmentScheduler.js
import React, { useState } from 'react';
import './AppointmentScheduler.css';

const AppointmentScheduler = ({ onAppointmentBook }) => {
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails({ ...appointmentDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAppointmentBook(appointmentDetails);
  };

  return (
    <div className="appointment-scheduler">
      <h2>Book a Consultation</h2>
      <form onSubmit={handleSubmit}>
        <label>Date</label>
        <input type="date" name="date" value={appointmentDetails.date} onChange={handleChange} />

        <label>Time</label>
        <input type="time" name="time" value={appointmentDetails.time} onChange={handleChange} />

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentScheduler;