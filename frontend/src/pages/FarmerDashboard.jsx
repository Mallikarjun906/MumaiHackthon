import { useState } from "react";
import axios from "axios";

const FarmerDashboard = () => {

const [cropName,setCropName] = useState("")
const [quantity,setQuantity] = useState("")
const [basePrice,setBasePrice] = useState("")
const [farmerName,setFarmerName] = useState("")
const [farmerPhone,setFarmerPhone] = useState("")
const [startTime,setStartTime] = useState("")
const [endTime,setEndTime] = useState("")

const createAuction = async () => {

await axios.post(
"http://localhost:5001/api/auction/create",
{
cropName,
quantity,
basePrice,
farmerName,
farmerPhone,
startTime,
endTime
}
)

alert("Auction Created")

}

return (

<div className="p-8">

<h1 className="text-3xl font-bold mb-6">
Create Auction
</h1>

<input
placeholder="Farmer Name"
onChange={(e)=>setFarmerName(e.target.value)}
className="border p-2 w-full mb-3"
/>

<input
placeholder="Farmer Phone"
onChange={(e)=>setFarmerPhone(e.target.value)}
className="border p-2 w-full mb-3"
/>

<input
placeholder="Crop Name"
onChange={(e)=>setCropName(e.target.value)}
className="border p-2 w-full mb-3"
/>

<input
placeholder="Quantity"
onChange={(e)=>setQuantity(e.target.value)}
className="border p-2 w-full mb-3"
/>

<input
placeholder="Base Price"
onChange={(e)=>setBasePrice(e.target.value)}
className="border p-2 w-full mb-3"
/>

<label>Start Time</label>

<input
type="datetime-local"
onChange={(e)=>setStartTime(e.target.value)}
className="border p-2 w-full mb-3"
/>

<label>End Time</label>

<input
type="datetime-local"
onChange={(e)=>setEndTime(e.target.value)}
className="border p-2 w-full mb-3"
/>

<button
onClick={createAuction}
className="bg-green-600 text-white p-3 rounded w-full"
>
Create Auction
</button>

</div>

)

}

export default FarmerDashboard