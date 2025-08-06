import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/UpdateEvent.css";
import "../css/AddEvent.css";
import { toast } from 'react-toastify';

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startdate: '',
    enddate: '',
    venue: '',
    branch: '',
    image: null
  });

  const [existingImage, setExistingImage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5001/api/admin/events/${id}`)
      .then(res => {
        const event = res.data; // ✅ your backend returns res.data directly
        setFormData({
          title: event.title,
          description: event.description,
          startdate: event.startdate.slice(0, 10),
          enddate: event.enddate.slice(0, 10),
          venue: event.venue,
          branch: event.branch,
          image: null // don't prefill file input
        });
        setExistingImage(`http://localhost:5001/${event.image}`);
      })
      .catch(err => console.error("Failed to fetch event:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = new FormData();

    for (let key in formData) {
      if (formData[key]) { // ✅ only append non-null fields
        updatedFormData.append(key, formData[key]);
      }
    }

    try {
      await axios.put(`http://localhost:5001/api/admin/events/${id}`, updatedFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success("Event updated!");
      navigate('/admin/events');
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Update failed. Check console.");
    }
  };

  return (
    <div className="form_container">
      <form className='add-event' onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="title" type="text" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input name="startdate" type="date" value={formData.startdate} onChange={handleChange} required />
        <input name="enddate" type="date" value={formData.enddate} onChange={handleChange} required />
        <input name="venue" type="text" placeholder="Venue" value={formData.venue} onChange={handleChange} />
        <input name="branch" type="text" placeholder="Branch" value={formData.branch} onChange={handleChange} />
        
        {/* ✅ Show existing image preview */}
        {existingImage && !formData.image && (
          <div style={{ marginBottom: '10px' }}>
            <p style={{ fontSize: '14px', color: '#555' }}>Current image:</p>
            <img src={`${existingImage}?t=${new Date().getTime()}`} alt="event" style={{ width: '200px', borderRadius: '5px' }} />
          </div>
        )}

        {/* ✅ File input */}
        <label className="custom-file-upload">
          <input name="image" type="file" accept="image/*" onChange={handleChange} />
          {formData.image ? formData.image.name : "Choose a new image"}
        </label>

        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default UpdateEvent;
