function JadwalCard(props) {
  return (
    <div>
      <h3>{props.lapangan}</h3>
      <p>{props.tanggal}</p>
      <p>{props.jam}</p>
    </div>
  )
}

export default JadwalCard