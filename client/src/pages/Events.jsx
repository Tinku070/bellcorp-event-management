import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/events?search=${search}&category=${category}`
      );

      if (Array.isArray(res.data)) {
        setEvents(res.data);
      } else {
        console.error("Unexpected events response:", res.data);
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyEvents = async () => {
    try {
      if (!user) return;

      const res = await API.get("/registrations/my");

      if (Array.isArray(res.data)) {
        setMyEvents(res.data.map((e) => e.event._id));
      } else {
        setMyEvents([]);
      }
    } catch (error) {
      console.error("Error fetching my events:", error);
      setMyEvents([]);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [search, category]);

  useEffect(() => {
    fetchMyEvents();
  }, [user]);

  const registerEvent = async (id) => {
    try {
      await API.post(`/registrations/${id}`);
      fetchMyEvents();
      alert("Registered successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error registering");
    }
  };

  const cancelEvent = async (id) => {
    try {
      await API.delete(`/registrations/${id}`);
      fetchMyEvents();
      alert("Registration cancelled");
    } catch (err) {
      alert("Error cancelling");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Event Discovery</h2>

        <input
          placeholder="Search events"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="Tech">Tech</option>
          <option value="Music">Music</option>
        </select>

        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events found</p>
        ) : (
          events.map((event) => {
            const isRegistered = myEvents.includes(event._id);

            return (
              <div key={event._id} className="card">
                <h3>{event.name}</h3>

                <p><b>Organizer:</b> {event.organizer}</p>
                <p><b>Location:</b> {event.location}</p>
                <p><b>Date:</b> {new Date(event.date).toDateString()}</p>
                <p><b>Category:</b> {event.category}</p>
                <p><b>Capacity:</b> {event.capacity}</p>

                {user ? (
                  isRegistered ? (
                    <button onClick={() => cancelEvent(event._id)}>
                      Cancel Registration
                    </button>
                  ) : (
                    <button onClick={() => registerEvent(event._id)}>
                      Register
                    </button>
                  )
                ) : (
                  <button onClick={() => navigate("/login")}>
                    Login to Register
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Events;
