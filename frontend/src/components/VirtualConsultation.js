import React, { useEffect } from 'react';

const VirtualConsultation = () => {
  useEffect(() => {
    // Tawk.to script logic
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    const script = document.createElement('script');
    script.src = 'https://embed.tawk.to/6716bbec2480f5b4f590fe78/1iaocs6h4';
    script.async = true;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Sample patient details (replace with actual data from state or props)
  const patientDetails = {
    name: 'John Doe',
    age: 30,
    gender: 'Male',
  };

  // Sample appointment details (replace with actual data)
  const appointmentDetails = {
    date: '2024-10-25',
    time: '14:00',
    type: 'Skin Consultation',
  };

  // Sample appointment status (replace with actual data)
  const appointmentStatus = 'Confirmed';

  return (
    <div>
      <h2>Virtual Consultation</h2>
      <h3>Patient Details</h3>
      <p><strong>Name:</strong> {patientDetails.name}</p>
      <p><strong>Age:</strong> {patientDetails.age}</p>
      <p><strong>Gender:</strong> {patientDetails.gender}</p>

      <h3>Appointment Details</h3>
      <p><strong>Date:</strong> {appointmentDetails.date}</p>
      <p><strong>Time:</strong> {appointmentDetails.time}</p>
      <p><strong>Type:</strong> {appointmentDetails.type}</p>

      <h3>Appointment Status</h3>
      <p><strong>Status:</strong> {appointmentStatus}</p>

      {/* Chatbot will be rendered automatically by Tawk.to script */}
    </div>
  );
};

export default VirtualConsultation;
