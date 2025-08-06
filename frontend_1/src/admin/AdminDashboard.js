import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/AdminDashboard.css"
const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className='container'>
      <h1>Welcome, Admin 👋</h1>
      <p  className='subtitle' >Manage Events and Teachers easily from here.</p>

      <div className='cardContainer' >
        <div className='card'  onClick={() => navigate('/admin/events/add')}>
          ➕ Add Event
        </div>
        <div  className='card' onClick={() => navigate('/admin/events')}>
          📅 Manage Events
        </div>
        <div  className='card' onClick={() => navigate('/admin/teachers/add')}>
          👤 Add Teacher
        </div>
        <div  className='card'  onClick={() => navigate('/admin/teachers')}>
          🧑‍🏫 Manage Teachers
        </div>
      </div>
    </div>
  );
};

const styles = {

};

export default AdminDashboard;
