import styles from "./Navbar.module.css"

function Navbar(){

return(

<nav className={styles.nav}>

<h2>Booking Futsal</h2>

<ul>

<li>Home</li>

<li>Lapangan</li>

<li>Booking</li>

<li>Profile</li>

</ul>

</nav>

)

}

export default Navbar