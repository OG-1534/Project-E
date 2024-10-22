// src/components/DoctorNotes.js
import React, { useState } from 'react';
import './DoctorNotes.css';

const DoctorNotes = () => {
  const [notes, setNotes] = useState('');

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div className="doctor-notes">
      <h2>Consultation Notes</h2>
      <textarea
        value={notes}
        onChange={handleNotesChange}
        placeholder="Enter doctor's notes here..."
      />
    </div>
  );
};

export default DoctorNotes;
