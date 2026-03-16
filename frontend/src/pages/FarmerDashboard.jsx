import { useState } from "react";
import axios from "axios";

function FarmerDashboard(){

const [crop,setCrop] = useState({
cropName:"",
quantity:"",
quality:"",
minPrice:""
})

const listCrop = async ()=>{

await axios.post(
"http://localhost:5000/api/crops/add",
crop
)

alert("Crop Listed")

}

return(

<div>

<h2>Farmer Dashboard</h2>

<input placeholder="Crop Name"
onChange={(e)=>setCrop({...crop,cropName:e.target.value})}
/>

<input placeholder="Quantity"
onChange={(e)=>setCrop({...crop,quantity:e.target.value})}
/>

<input placeholder="Quality"
onChange={(e)=>setCrop({...crop,quality:e.target.value})}
/>

<input placeholder="Minimum Price"
onChange={(e)=>setCrop({...crop,minPrice:e.target.value})}
/>

<br/><br/>

<button onClick={listCrop}>List Crop</button>

</div>

)

}

export default FarmerDashboard