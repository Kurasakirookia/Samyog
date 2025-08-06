import React from 'react'
import "../css/AboutUsComponent.css"
// import React, { useEffect, useRef } from 'react';
import ScrollingCards from './ScrollingCards'
import StatsData from '../data/StatsData'
// import img from "../assets/cube_samyog_logos_white.png"
import AboutTeachersSlabs from './AboutTeachersSlabs'
import { useEffect, useState } from "react";
const AboutUsComponent = () => {
    const [statsData, setStatsData] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
        const data = await StatsData(); // 👈 Await the Promise here
        setStatsData(data); // data will now be an array
        };

        fetchStats();
    }, []);

  return (
    <div className='about_us_container'>
        <div className="about_hero">
            <div className="hero_top">
                <h1 className='texth about_hero_text'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, eligendi.
                </h1>
            </div>
            <div className="vision">
                <p className='textm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                 <p className='textm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>

        </div>
        <div className="about_ise">
            <div className="ise_text_container">
                <h1 className='ise_text texth'>Lorem ipsum dolor sit amet consectetur.</h1>
            </div>

            <div className="card_display">
                <ScrollingCards/>

            </div>
        </div>
        <div className="teachers_info_numbers">
                <div className="stats-container">
                    {statsData.map((stat, index) => (
                        <div key={index} className="stat-box">
                            <h4 className='textm'>{stat.title}</h4>
                            <div className="stat-value texth">{stat.value}</div>
                        </div>
                    ))}
                </div>
    
         </div>
         <div className="teachers_hod_coordinators">
            <AboutTeachersSlabs/>
            <div className="teacher_hero_section">
                <h1 className="texth teacher_hero_title">Teacher section title</h1>
                <p className="textm teacher_hero_des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem dolores nulla alias magni libero eveniet ad quia perspiciatis sapiente, eos, molestias veniam modi illum, praesentium excepturi at quaerat quas expedita.</p>
            </div>
         </div>
      
    </div>
  )
}

export default AboutUsComponent
