import {useState} from "react";

function UploadFoto(){

const[foto,setFoto]=useState(null);

function handleFoto(e){

const file=e.target.files[0];

if(file){

setFoto(URL.createObjectURL(file));

}

}

return(

<div>

<h2>Upload Foto</h2>

<input
type="file"
onChange={handleFoto}
/>

<br/><br/>

{

foto && (

<img
src={foto}
alt="profile"
width="200"
/>

)

}

</div>

)

}

export default UploadFoto