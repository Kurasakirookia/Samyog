import {useEffect,useState } from "react";
import "../css/EventIdComponent.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/public/events/${id}`);
        setEvent(res.data.data);
      } catch (err) {
        console.error("Failed to fetch event details", err);
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) return <p>Loading...</p>;
  // const location = useLocation();
  // const event = location.state?.event;

  // if (!event) {
  //   return <h2>Event data not available.</h2>;
  // }

  return (
    <div className="details_container">
      <div className="details_info">
        <div className="poster_img">
          <div className="poster_title">
            <h1 className="texth">{event.title}</h1>
            <p>{event.description}</p>
          </div>
          <img  src={`http://localhost:5001/${event.image}`}
        alt={event.title} className="poster" />
        </div>
        <div className="poster_info_container">
          <p className="poster_info">{event.description || "No extra info provided."}</p>
          <h3>Registertaion open: {event.startdate || "N/A"}</h3>
          <h3>Deadline: {event.enddate || "N/A"}</h3>
          <div className="links">
            <a
              href={event.registrationLink || "#"}
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register
            </a>
            <button
              className="link"
              onClick={() => navigator.clipboard.writeText(window.location.href)}
            >
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
