import LapanganList from "../components/LapanganList.jsx"
import BookingForm from "../components/BookingForm/BookingForm"

export default function Home() {
  return (
    <div>
      <h1>Booking Futsal</h1>

      <LapanganList />

      <hr />

      <h2>Jadwal Booking</h2>

      <BookingForm />
    </div>
  )
}