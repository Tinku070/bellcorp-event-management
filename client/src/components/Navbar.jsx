import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <div className="container" style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Link to="/">Events</Link>
          {user && <Link to="/dashboard">Dashboard</Link>}
        </div>

        <div>
          {user ? (
            <>
              <span style={{ marginRight: 10 }}>Hi, {user.name}</span>
              <button onClick={logout} style={{ width: "auto" }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
