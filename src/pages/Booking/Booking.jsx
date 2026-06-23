import BookingForm from "../../components/BookingForm/BookingForm";
import styles from "./Booking.module.css";

function Booking() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.eyebrow}>RESERVASI LAPANGAN</span>
        <h1 className={styles.title}>Form Booking</h1>
        <p className={styles.desc}>
          Isi data di bawah untuk memesan slot lapangan futsal pilihanmu.
        </p>
      </div>

      <div className={styles.formWrapper}>
        <BookingForm />
      </div>
    </div>
  );
}

export default Booking;
