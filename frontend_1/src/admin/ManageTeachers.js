import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/ManageEvent.css"
import { color } from 'framer-motion';
const ManageTeachers = () => {
  const [teacher, setTeacher] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5001/api/public/teachers') // Adjust URL if needed
      .then(res => {
        setTeacher(res.data.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Teacher info?")) {
      try {
        await axios.delete(`http://localhost:5001/api/admin/teachers/${id}`);
        setTeacher(teacher.filter(teacher => teacher._id !== id));
      } catch (error) {
        // toast.error("Delete failed", error);
        console.error("Delete failed", error);
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/teachers/${id}`);
  };

  return (
    <div className="manage_container" >
    <div className="manage-events">
      <h2>Manage Teacher's info</h2>
      <table>
        <thead>
          <tr>
            <th id='admin_event_title' style={{color:'black'}}>Title</th>
            <th  style={{color:'black'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teacher && teacher.map(teacher => (
            <tr key={teacher._id}>
              <td style={{color:'white',}}>{teacher.name}</td>
              <td>
                <button onClick={() => handleUpdate(teacher._id)}>Update</button>
                <button onClick={() => handleDelete(teacher._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ManageTeachers;
