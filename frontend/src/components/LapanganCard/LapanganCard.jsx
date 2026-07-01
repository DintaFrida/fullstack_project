function LapanganCard(props){

return(

<div style={{
border:"1px solid #ddd",
padding:"15px",
margin:"15px",
borderRadius:"12px",
width:"250px",
background:"#1e1e1e",
color:"white",
boxShadow:"0 2px 8px rgba(0,0,0,0.3)"
}}>

<h2>{props.nama}</h2>

<p>⚽ Jenis: {props.jenis}</p>

<p>💰 Harga: {props.harga}</p>

<button style={{
padding:"8px 15px",
border:"none",
borderRadius:"8px",
cursor:"pointer"
}}>
Booking
</button>

</div>

)

}

export default LapanganCard