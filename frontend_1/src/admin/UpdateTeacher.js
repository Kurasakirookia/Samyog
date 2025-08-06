import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/UpdateEvent.css";
import "../css/AddEvent.css";
import { toast } from 'react-toastify';

const UpdateTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    designation: '',
    email: '',
    contactNumber: '',
    description: '',
    image: null,
  });

  const [existingImage, setExistingImage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5001/api/admin/teachers/${id}`)
      .then(res => {
        const teacher = res.data;
        setFormData({
          name: teacher.name || '',
          branch: teacher.branch || '',
          designation: teacher.designation || '',
          email: teacher.email || '',
          contactNumber: teacher.contactNumber || '',
          description: teacher.description || '',
          image: null, // Don't prefill file input
        });

        if (teacher.image) {
          setExistingImage(`http://localhost:5001/${teacher.image}`);
        }
      })
      .catch(err => {
        console.error("Failed to fetch teacher's info:", err);
        toast.success("Could not load teacher data.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = new FormData();
    for (let key in formData) {
      if (formData[key]) {
        updatedFormData.append(key, formData[key]);
      }
    }

    try {
      await axios.put(`http://localhost:5001/api/admin/teachers/${id}`, updatedFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success("Teacher updated successfully!");
      navigate('/admin/teachers');
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Update failed. See console for details.");
    }
  };

  return (
    <div className="form_contianer">
      <form className="add-event" onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="branch"
          type="text"
          placeholder="Branch"
          value={formData.branch}
          onChange={handleChange}
          required
        />

        <input
          name="designation"
          type="text"
          placeholder="Designation"
          value={formData.designation}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          name="contactNumber"
          type="text"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Short Bio / Description"
          value={formData.description}
          onChange={handleChange}
        />

        {existingImage && !formData.image && (
          <div style={{ marginBottom: '10px' }}>
            <p style={{ fontSize: '14px', color: '#555' }}>Current image:</p>
            <img
              src={`${existingImage}?t=${Date.now()}`}
              alt="teacher"
              style={{ width: '200px', borderRadius: '5px' }}
            />
          </div>
        )}

        <label className="custom-file-upload">
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
          {formData.image ? formData.image.name : "Choose a new image"}
        </label>

        <button type="submit">Update Teacher</button>
      </form>
    </div>
  );
};

export default UpdateTeacher;
