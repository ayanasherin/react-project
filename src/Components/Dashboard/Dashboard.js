import React, { Component } from 'react';
import './Dashboard.css';

class Dashboard extends Component {
  render() {
    const firstName = localStorage.getItem('firstName'); // Retrieve firstName from local storage
    // const email = localStorage.getItem('email'); // You can retrieve other user info similarly if needed

    return (
      <div className="dashboard">
        <h2>Welcome {firstName}..!</h2>
      </div>
    );
  }
}

export default Dashboard;
