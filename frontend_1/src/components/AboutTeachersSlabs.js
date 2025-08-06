import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import "../css/AboutTeachersSlabs.css";

const designationOrder = {
  "HOD": 1,
  "Professor": 2,
  "Associate Professor": 3,
  "Assistant Professor": 4,
  "Non-teaching": 5,
};

const TeacherSlider = () => {
  const [teachers, setTeachers] = useState([]);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/public/teachers");
        const fetchedTeachers = response.data.data;

        const sortedTeachers = [...fetchedTeachers].sort((a, b) => {
          const aOrder = designationOrder[a.designation?.trim()] || 99;
          const bOrder = designationOrder[b.designation?.trim()] || 99;
          return aOrder - bOrder;
        });

        setTeachers(sortedTeachers);

        console.log(sortedTeachers);
            const startingIndex = sortedTeachers.findIndex((teacher) =>
            teacher.designation?.toLowerCase().includes("hod")
          );

          setIndex(startingIndex !== -1 ? startingIndex : 0);
          console.log(sortedTeachers[startingIndex])
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const nextTeacher = () => {
    setIndex((prev) => (prev + 1) % teachers.length);
  };

  const prevTeacher = () => {
    setIndex((prev) => (prev - 1 + teachers.length) % teachers.length);
  };

  if (!teachers || !Array.isArray(teachers) || teachers.length === 0) {
    return <div className="teacher-slider">Loading...</div>;
  }

  return (
    <div className="teacher-slider">
      <button className="arrow-button left" onClick={prevTeacher}>
        ←
      </button>

      <div className="teacher_card">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="info_container"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.4 }}
          >
            <div className="teacher_info">
              <h3>{teachers[index].name}</h3>
              <p>{teachers[index].designation}</p>
            </div>
            <div className="teacher_des">
              <p className="textm teacher_des_info">{teachers[index].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="image-stack">
          <motion.img
            key={teachers[index].image}
            src={`http://localhost:5001/${teachers[index].image}?t=${new Date().getTime()}`}
            alt={teachers[index].name}
            className="circle-img active"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <button className="arrow-button right" onClick={nextTeacher}>
        →
      </button>
    </div>
  );
};

export default TeacherSlider;
