import "./App.css";

import Navbar from "./components/Navbar/Navbar";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import CardLapangan from "./components/LapanganCard/CardLapangan";
import BookingForm from "./components/BookingForm/BookingForm";

import Profile from "./pages/Profile/Profile";

import Footer from "./components/Footer/Footer";

import lapangan from "./utils/lapangan";

function App(){

return(

<div className="container">

<Navbar/>

<div className="section">

<Login/>

</div>

<div className="section">

<Register/>

</div>

<div className="section">

<h1>Sistem Booking Lapangan</h1>

<div className="cardContainer">

{

lapangan.map((item)=>(

<CardLapangan
key={item.id}
nama={item.nama}
harga={item.harga}
/>

))

}

</div>

</div>

<div className="section">

<BookingForm/>

</div>

<div className="section">

<Profile/>

</div>

<Footer/>

</div>

)

}

export default App;