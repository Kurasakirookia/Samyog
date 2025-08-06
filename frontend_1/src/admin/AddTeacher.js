import React, { useState } from "react";
import { toast } from "react-toastify";
import { createTeacher } from "../services/adminApi";

const AddTeacher = () => {
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    designation: "",
    email: "",
    contactNumber: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }


     await createTeacher(data);
     toast.success("teacher added!");
    // try {
    //   const response = await fetch("/api/admin/teachers", {
    //     method: "POST",
    //     body: data,
    //   });

    //   const result = await response.json();

    //   if (!response.ok) {
    //     throw new Error(result.message || "Failed to add teacher");
    //   }

    //   toast.success("Teacher added successfully!");
    //   setFormData({
    //     name: "",
    //     branch: "",
    //     designation: "",
    //     email: "",
    //     contactNumber: "",
    //     description: "",
    //     image: null,
    //   });
    // } catch (error) {
    //   toast.error(error.message || "Something went wrong");
    // }
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
        <label className="custom-file-upload">
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
          {formData.image ? formData.image.name : "Choose an Image"}
        </label>

        <button type="submit">Add Teacher</button>
      </form>
    </div>
  );
};

export default AddTeacher;
