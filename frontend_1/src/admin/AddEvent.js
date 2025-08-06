import React, { useState } from 'react';
import { createEvent } from '../services/adminApi';
import "../css/AddEvent.css"
import { toast } from 'react-toastify';
const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startdate: '',
    enddate:'',
    venue: '',
    branch: '',
    image: null,
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = new FormData();
    for (let key in formData) {
      eventData.append(key, formData[key]);
    }
    await createEvent(eventData);
    toast.success("Event added!");
  };

  return (

    <div className="form_contianer">
    <form className='add-event'  onSubmit={handleSubmit} encType="multipart/form-data">
      <input name="title" type="text" placeholder="Title" value={formData.title} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      <label htmlFor="startdate" className='textm'>Enter the start date</label>
      <input name="startdate" placeholder='start date' type="date" value={formData.startdate} onChange={handleChange} />
      <label htmlFor="enddate" className='textm'>Enter the End date</label>
      <input name="enddate" placeholder='end date' type="date" value={formData.enddate} onChange={handleChange} />
      <input name="venue" type="text" placeholder="Venue" value={formData.venue} onChange={handleChange} />
      <input name="branch" type="text" placeholder="Branch" value={formData.branch} onChange={handleChange} />
      <label className="custom-file-upload">
        <input name="image" type="file" accept="image/*" onChange={handleChange} />
        {formData.image ? formData.image.name : "Choose an Image"}
    </label>

      <button type="submit">Add Event</button>
    </form>
    </div>
  );
};

export default AddEvent;
