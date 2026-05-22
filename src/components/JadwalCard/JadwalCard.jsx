function JadwalCard(props){

return(

<div className="card">

<h2>{props.hari}</h2>

<p>Jam : {props.jam}</p>

<p>Status : {props.status}</p>

</div>

)

}

export default JadwalCard