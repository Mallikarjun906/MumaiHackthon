import { useState } from "react";
import axios from "axios";

function DealerDashboard(){

const [product,setProduct] = useState({
name:"",
price:"",
quantity:"",
description:""
})

const addProduct = async ()=>{

await axios.post(
"http://localhost:5001/api/fertilizers/add",
product
)

alert("Product Added")

}

return(

<div>

<h2>Dealer Dashboard</h2>

<input placeholder="Fertilizer Name"
onChange={(e)=>setProduct({...product,name:e.target.value})}
/>

<input placeholder="Price"
onChange={(e)=>setProduct({...product,price:e.target.value})}
/>

<input placeholder="Quantity"
onChange={(e)=>setProduct({...product,quantity:e.target.value})}
/>

<input placeholder="Description"
onChange={(e)=>setProduct({...product,description:e.target.value})}
/>

<br/><br/>

<button onClick={addProduct}>Add Fertilizer</button>

</div>

)

}

export default DealerDashboard