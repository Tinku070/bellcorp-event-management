import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyEvents = async () => {
    const { data } = await API.get("/registrations/my");
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const cancelEvent = async (id) => {
    await API.delete(`/registrations/${id}`);
    fetchMyEvents();
  };

  const now = new Date();

  const upcoming = events.filter(
    (e) => new Date(e.event.date) > now
  );

  const past = events.filter(
    (e) => new Date(e.event.date) < now
  );

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>User Dashboard</h2>

        {loading ? (
          <p>Loading your events...</p>
        ) : (
          <>
            <h3>Upcoming Events</h3>
            {upcoming.length === 0 && <p>No upcoming events</p>}
            {upcoming.map((e) => (
              <div key={e._id} className="card">
                <h4>{e.event.name}</h4>
                <p>{new Date(e.event.date).toDateString()}</p>
                <button onClick={() => cancelEvent(e.event._id)}>
                  Cancel
                </button>
              </div>
            ))}

            <h3>Past Events</h3>
            {past.length === 0 && <p>No past events</p>}
            {past.map((e) => (
              <div key={e._id} className="card">
                <h4>{e.event.name}</h4>
                <p>{new Date(e.event.date).toDateString()}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
