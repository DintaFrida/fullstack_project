import { useState } from "react";
import { createBooking } from "../../services/BookingApi";

function BookingForm() {
  const [formData, setFormData] = useState({
    nama_pemesan: "",
    jam: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleBooking() {
    try {
      setLoading(true);

      const response = await createBooking(formData);

      alert(
        "Booking berhasil!\n" +
        "ID Booking : " +
        (response.data?.data?.id || "-")
      );

      setFormData({
        nama_pemesan: "",
        jam: "",
      });
    } catch (error) {
      alert("Booking gagal");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Form Booking</h1>

      <input
        type="text"
        name="nama_pemesan"
        placeholder="Nama Pemesan"
        value={formData.nama_pemesan}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="text"
        name="jam"
        placeholder="Jam Booking"
        value={formData.jam}
        onChange={handleChange}
      />

      <br />
      <br />

      <button
        onClick={handleBooking}
        disabled={loading}
      >
        {loading ? "Memproses..." : "Booking Sekarang"}
      </button>
    </div>
  );
}

export default BookingForm;