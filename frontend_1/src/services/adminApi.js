import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api/admin", // Adjust as needed
  withCredentials: false, // if using cookies
});

export const getEvents = () => API.get("/events");
export const getEvent = (id) => API.get(`/events/${id}`);
// export const createEvent = (data) => API.post("/events", data);
export const createEvent = async (eventData) => {
  try {
    const res = await axios.post('http://localhost:5001/api/admin/events', eventData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // Optional: If using token-based auth:
        // Authorization: `Bearer ${yourToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error creating event:", err.response?.data || err.message);
    throw err;
  }
};
export const updateEvent = (id, data) => API.put(`/events/${id}`, data);
export const deleteEvent = (id) => API.delete(`/events/${id}`);


// TEACHERS
export const getAllTeachers = () => API.get('/teachers');
export const createTeacher = (data) => API.post('/teachers', data);
export const updateTeacher = (id, data) => API.put(`/teachers/${id}`, data);
export const deleteTeacher = (id) => API.delete(`/teachers/${id}`); 