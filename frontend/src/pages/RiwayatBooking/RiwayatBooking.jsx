function RiwayatBooking() {
  const dataBooking = [
    {
      id: 1,
      lapangan: "Lapangan A",
      tanggal: "2026-06-22",
      jam: "08:00",
    },
    {
      id: 2,
      lapangan: "Lapangan B",
      tanggal: "2026-06-23",
      jam: "10:00",
    },
  ];

  return (
    <div>
      <h1>Riwayat Booking</h1>

      {dataBooking.map((item) => (
        <div key={item.id}>
          <h3>{item.lapangan}</h3>
          <p>{item.tanggal}</p>
          <p>{item.jam}</p>
        </div>
      ))}
    </div>
  );
}

export default RiwayatBooking;