import {useState} from "react";

function BookingForm(){

const[nama,setNama]=useState("");
const[jam,setJam]=useState("");

function handleBooking(){

alert(

"Booking berhasil\n"+
"Nama : "+nama+
"\nJam : "+jam

)

}

return(

<div>

<h1>Form Booking</h1>

<input
type="text"
placeholder="Nama Pemesan"
value={nama}
onChange={(e)=>setNama(e.target.value)}
/>

<br/><br/>

<input
type="text"
placeholder="Jam Booking"
value={jam}
onChange={(e)=>setJam(e.target.value)}
/>

<br/><br/>

<button onClick={handleBooking}>
Booking Sekarang
</button>

</div>

)

}

export default BookingForm