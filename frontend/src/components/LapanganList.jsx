import LapanganCard from "./LapanganCard/LapanganCard"

function LapanganList(){

return(

<div style={{
display:"flex",
gap:"20px",
flexWrap:"wrap"
}}>

<LapanganCard
nama="Lapangan A"
jenis="Futsal"
harga="Rp100.000"
/>

<LapanganCard
nama="Lapangan B"
jenis="Mini Soccer"
harga="Rp150.000"
/>

</div>

)

}

export default LapanganList