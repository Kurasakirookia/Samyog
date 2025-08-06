

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../css/EventSection.css";
import EventDescriptions from '../data/EventDescriptions';
import axios from 'axios';

const EventCard = ({ event }) => {
  return (
    <Link
      to={`/events/${event._id}`}
      state={{ event }}
      className="event_card"
    >
      <div className="img_container"><img
        src={`http://localhost:5001/${event.image}?t=${new Date().getTime()}`}
        alt={event.title} className='event_img'
      />
      </div>
      
      <h3 id='event_title'>{event.title}</h3>
      <p id='event_des'>{event.date} | {event.venue}</p>
      <p id='events_branch'>{event.branch}</p>
    </Link>
  );
};

const EventSection = () => {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('Upcoming');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/public/events");
        setEvents(res.data.data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };
    fetchEvents();
  }, []);

  // Temporary until we implement the logic to split by dates
 const getFilteredEvents = () => {
    const today = new Date();
  if (!Array.isArray(events)) return [];

    return events.filter((event) => {
      const start = new Date(event.startdate);
      const end = new Date(event.enddate);

      if (activeTab === 'Upcoming') {
        return start > today;
      } else if (activeTab === 'Ongoing') {
        return start <= today && end >= today;
      } else if (activeTab === 'Past') {
        return end < today;
      }
      return false;
    });
  };

  return (
    <div className="event_container">
      <div className="event_tab_buttons">
        <button onClick={() => setActiveTab('Past')} className={activeTab === 'Past' ? 'active' : ''}>Past</button>
        <button onClick={() => setActiveTab('Ongoing')} className={activeTab === 'Ongoing' ? 'active' : ''}>Ongoing</button>
        <button onClick={() => setActiveTab('Upcoming')} className={activeTab === 'Upcoming' ? 'active' : ''}>Upcoming</button>
      </div>

      <div className="events_card_container">
        <div className="event_hero_section">
          <div className="active_event_info">
            <h1 className="texth active_event">
              {activeTab} Samyog <br /> Events & Seminars
            </h1>
          </div>
        </div>

        <div className="event_cards_info">
          <div className="event_info">
            <p className="textm event_des">
              {EventDescriptions[activeTab]}
            </p>
          </div>

          <div className="eventcards scroll-x">
            {getFilteredEvents().length === 0 ? (
              <p style={{ color: '#555', fontStyle: 'italic', padding: '1rem' }}>
                No {activeTab} events
              </p>
            ) : (
              getFilteredEvents().map((event) => (
                <EventCard key={event._id} event={event} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSection;
