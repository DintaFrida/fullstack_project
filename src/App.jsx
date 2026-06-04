import "./App.css";

import Navbar from "./components/Navbar/Navbar";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import BookingForm from "./components/BookingForm/BookingForm";

import JadwalCard from "./components/JadwalCard/JadwalCard";
import Profile from "./pages/Profile/Profile";

import Footer from "./components/Footer/Footer";

import jadwal from "./utils/jadwal";

import LapanganList from "./components/Lapangan/LapanganList";

function App() {
  return (
    <div className="container">
      <Navbar />

      <div className="section">
        <Login />
      </div>

      <div className="section">
        <Register />
      </div>

      <div className="section">
        <h1>Sistem Booking Lapangan</h1>
        <LapanganList />
      </div>

      <div className="section">
        <BookingForm />
      </div>

      <div className="section">
        <h1>Jadwal Booking</h1>

        <div className="cardContainer">
          {jadwal.map((item) => (
            <JadwalCard
              key={item.id}
              hari={item.hari}
              jam={item.jam}
              status={item.status}
            />
          ))}
        </div>
      </div>

      <div className="section">
        <Profile />
      </div>

      <Footer />
    </div>
  );
}

export default App;