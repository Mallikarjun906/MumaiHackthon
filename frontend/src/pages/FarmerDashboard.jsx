import { useState } from "react";
import axios from "axios";

const FarmerDashboard = () => {

const [cropName,setCropName] = useState("")
const [quantity,setQuantity] = useState("")
const [basePrice,setBasePrice] = useState("")
const [loading,setLoading] = useState(false)

const createAuction = async (e)=>{

e.preventDefault()
setLoading(true)

try{

await axios.post(
"http://localhost:5001/api/auction/create",
{
cropName,
quantity,
basePrice
}
)

alert("Auction created successfully")

setCropName("")
setQuantity("")
setBasePrice("")

}catch(err){

alert("Error creating auction")

}

setLoading(false)

}

return (

<div className="min-h-screen bg-gray-100 p-8">

<h1 className="text-3xl font-bold mb-6">
Farmer Dashboard
</h1>

<div className="bg-white p-8 rounded-xl shadow max-w-md">

<h2 className="text-xl font-bold mb-4">
Create Crop Auction
</h2>

<form onSubmit={createAuction} className="space-y-4">

<input
type="text"
placeholder="Crop Name"
value={cropName}
onChange={(e)=>setCropName(e.target.value)}
className="w-full border p-3 rounded"
/>

<input
type="number"
placeholder="Quantity (kg)"
value={quantity}
onChange={(e)=>setQuantity(e.target.value)}
className="w-full border p-3 rounded"
/>

<input
type="number"
placeholder="Base Price (₹)"
value={basePrice}
onChange={(e)=>setBasePrice(e.target.value)}
className="w-full border p-3 rounded"
/>

<button
type="submit"
disabled={loading}
className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
>

{loading ? "Creating..." : "Create Auction"}

</button>

</form>

</div>

</div>

)

}

export default FarmerDashboard