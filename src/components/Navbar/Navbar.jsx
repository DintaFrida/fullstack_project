import { Link } from "react-router-dom"; // ⬅ TAMBAH

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary rounded mt-3">
      <div className="container">

        {/* <a> → <Link to="/"> */}
        <Link className="navbar-brand fw-bold" to="/">
          Booking Futsal
        </Link>

        <ul className="navbar-nav ms-auto">

          <li className="nav-item">
            <Link className="nav-link text-white" to="/">Home</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/lapangan">Lapangan</Link>
          </li>

          {/* ⬅ TAMBAH menu Jadwal */}
          <li className="nav-item">
            <Link className="nav-link text-white" to="/jadwal">Jadwal</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/booking">Booking</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/profile">Profile</Link>
          </li>

          {/* ⬅ TAMBAH menu Login & Register */}
          <li className="nav-item">
            <Link className="nav-link text-white" to="/login">Login</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/register">Register</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;