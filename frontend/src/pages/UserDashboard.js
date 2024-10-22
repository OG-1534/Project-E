import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserDashboard.css';

const UserDashboard = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-3 col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-person-circle icon-lg"></i>
              <h5 className="card-title">Profile</h5>
              <p className="card-text">Manage your account and view order history.</p>
              <a href="/profile" className="btn btn-outline-primary">Go to Profile</a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-box-seam icon-lg"></i>
              <h5 className="card-title">My Orders</h5>
              <p className="card-text">Check the status of your orders.</p>
              <a href="/orders" className="btn btn-outline-primary">View Orders</a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-journal-medical icon-lg"></i>
              <h5 className="card-title">Consultation</h5>
              <p className="card-text">Book a session with a dermatologist.</p>
              <a href="/consultation" className="btn btn-outline-primary">Consult Now</a>
            </div>
          </div>
        </div>
        {/* Add more sections as needed */}
      </div>
    </div>
  );
};

export default UserDashboard;
