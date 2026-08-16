import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <div className="logo-icon">Q</div>
        Join<span>Q</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/join">Join Queue</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/create" className="nav-create">
          Create Queue
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;