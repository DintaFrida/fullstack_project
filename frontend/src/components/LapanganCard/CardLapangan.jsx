function CardLapangan(props){

return(

<div className="card">

<h2>{props.nama}</h2>

<p>{props.harga}</p>

<button>
Booking
</button>

</div>

)

}

export default CardLapangan