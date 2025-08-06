import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/ManageEvent.css"
import { toast } from 'react-toastify';
const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5001/api/public/events') // Adjust URL if needed
      .then(res => {
        setEvents(res.data.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`http://localhost:5001/api/admin/events/${id}`);
        setEvents(events.filter(event => event._id !== id));
      } catch (error) {
        // toast.error("Delete failed", error);
        console.error("Delete failed", error);
        
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/events/${id}`);
  };

  return (
    <div className="manage_container" >
    <div className="manage-events">
      <h2>Manage Events</h2>
      <table>
        <thead>
          <tr>
            <th id='admin_event_title' style={{color:'black',}}>Title</th>
            <th  style={{color:'black',}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events && events.map(event => (
            <tr key={event._id}>
              <td>{event.title}</td>
              <td>
                <button onClick={() => handleUpdate(event._id)}>Update</button>
                <button onClick={() => handleDelete(event._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ManageEvents;
