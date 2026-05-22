import {useState} from "react"
function UploadFoto(){
const [foto,setFoto]=useState(null)
function handleFoto(e){
setFoto(
URL.createObjectURL(
E.target.files[0]
)
)
}
return(
<div>
<h2>Upload Foto</h2>
<input
type="file"
onChange={handleFoto}
/>
{
foto &&
<img
src={foto}
width="200"
/>
}
</div>
)
}
export default UploadFoto