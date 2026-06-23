import JadwalCard from "../../components/JadwalCard/JadwalCard";
import jadwal from "../../utils/jadwal";

function Jadwal() {
  return (
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
  );
}

export default Jadwal;