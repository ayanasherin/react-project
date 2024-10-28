import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const firstname = localStorage.getItem('firstname'); 

  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="dashboard">
      <h2 className='dashboard-h2'>Welcome {firstname}..!</h2>
    </div>
  );
};

export default Dashboard;
