import JadwalCard from "../JadwalCard/JadwalCard";

function BookingForm() {
  return (
    <>
      <JadwalCard
        lapangan="Lapangan A"
        tanggal="12 Juni"
        jam="10:00"
      />

      <input placeholder="Tanggal" />
      <button>Booking</button>
    </>
  );
}

export default BookingForm;