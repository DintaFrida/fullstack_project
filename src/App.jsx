import Navbar from "./components/Navbar/Navbar";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import CardLapangan from "./components/LapanganCard/CardLapangan";
import BookingForm from "./components/BookingForm/BookingForm";

import Footer from "./components/Footer/Footer";

import lapangan from "./utils/lapangan";

function App() {

return(

<>

<Navbar/>

<Login/>

<hr/>

<Register/>

<hr/>

<h1>Sistem Booking Lapangan</h1>

{

lapangan.map((item)=>(

<CardLapangan
key={item.id}
nama={item.nama}
harga={item.harga}
/>

))

}

<hr/>

<BookingForm/>

<hr/>

<Footer/>

</>

)

}

export default App;