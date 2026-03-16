import { useState, useEffect } from "react";
import axios from "axios";
import {
LayoutDashboard,
PlusCircle,
List,
TrendingUp
} from "lucide-react";

export default function FarmerDashboard(){

const [page,setPage] = useState("dashboard")
const [auctions,setAuctions] = useState([])

/* FORM STATES */

const [cropName,setCropName] = useState("")
const [quantity,setQuantity] = useState("")
const [basePrice,setBasePrice] = useState("")
const [farmerName,setFarmerName] = useState("")
const [farmerPhone,setFarmerPhone] = useState("")
const [startTime,setStartTime] = useState("")
const [endTime,setEndTime] = useState("")

/* FETCH AUCTIONS */

useEffect(()=>{
fetchAuctions()
},[])

const fetchAuctions = async()=>{

try{

const res = await axios.get(
"http://localhost:5001/api/auction"
)

setAuctions(res.data)

}catch(err){
console.log("Fetch error")
}

}

/* CREATE AUCTION */

const createAuction = async()=>{

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

fetchAuctions()

alert("Auction Created")

}

/* STATS */

const active = auctions.filter(a=>new Date(a.endTime)>new Date()).length
const closed = auctions.filter(a=>new Date(a.endTime)<new Date()).length
const highest = auctions.reduce((max,a)=>Math.max(max,a.highestBid||0),0)

return(

<div className="flex min-h-screen bg-gray-100">

{/* SIDEBAR */}

<div className="w-64 bg-green-900 text-white p-6">

<h1 className="text-xl font-bold mb-6">
Farmer Panel
</h1>

<div className="space-y-3">

<button
onClick={()=>setPage("dashboard")}
className="flex items-center gap-2 w-full p-2 rounded hover:bg-green-800"
>
<LayoutDashboard size={18}/>
Dashboard
</button>

<button
onClick={()=>setPage("create")}
className="flex items-center gap-2 w-full p-2 rounded hover:bg-green-800"
>
<PlusCircle size={18}/>
Add Auction
</button>

<button
onClick={()=>setPage("list")}
className="flex items-center gap-2 w-full p-2 rounded hover:bg-green-800"
>
<List size={18}/>
My Auctions
</button>

<button
onClick={()=>setPage("market")}
className="flex items-center gap-2 w-full p-2 rounded hover:bg-green-800"
>
<TrendingUp size={18}/>
Live Market
</button>

</div>

</div>

{/* MAIN */}

<div className="flex-1 p-8">

{/* HEADER */}

<h1 className="text-2xl font-bold mb-6">
Farmer Dashboard
</h1>

{/* DASHBOARD */}

{page==="dashboard" && (

<div>

{/* STATS */}

<div className="grid md:grid-cols-4 gap-6 mb-6">

<div className="bg-white p-6 rounded shadow">
<p className="text-gray-500">Total Auctions</p>
<h2 className="text-2xl font-bold">
{auctions.length}
</h2>
</div>

<div className="bg-white p-6 rounded shadow">
<p className="text-gray-500">Active Auctions</p>
<h2 className="text-2xl font-bold">
{active}
</h2>
</div>

<div className="bg-white p-6 rounded shadow">
<p className="text-gray-500">Closed Auctions</p>
<h2 className="text-2xl font-bold">
{closed}
</h2>
</div>

<div className="bg-white p-6 rounded shadow">
<p className="text-gray-500">Highest Bid</p>
<h2 className="text-2xl font-bold">
₹{highest}
</h2>
</div>

</div>

{/* TABLE */}

<div className="bg-white rounded shadow">

<table className="w-full">

<thead className="bg-gray-100">

<tr>

<th className="p-3 text-left">Crop Name</th>
<th>Quantity</th>
<th>Base Price</th>
<th>Highest Bid</th>
<th>Bidder</th>
<th>Status</th>

</tr>

</thead>

<tbody>

{auctions.map(a=>{

const closed = new Date(a.endTime)<new Date()

return(

<tr key={a._id} className="border-t">

<td className="p-3">{a.cropName}</td>

<td>{a.quantity} kg</td>

<td>₹{a.basePrice}</td>

<td className="text-green-600 font-semibold">
₹{a.highestBid || a.basePrice}
</td>

<td>{a.highestBidder || "--"}</td>

<td>

{closed ? (
<span className="bg-gray-200 px-3 py-1 rounded text-sm">
Closed
</span>
):(
<span className="bg-green-600 text-white px-3 py-1 rounded text-sm">
Active
</span>
)}

</td>

</tr>

)

})}

</tbody>

</table>

</div>

</div>

)}

{/* CREATE AUCTION */}

{page==="create" && (

<div className="bg-white p-6 rounded shadow max-w-xl">

<h2 className="text-xl font-bold mb-4">
Add Auction
</h2>

<input
placeholder="Farmer Name"
onChange={(e)=>setFarmerName(e.target.value)}
className="border p-2 w-full mb-3"
/>

<input
placeholder="Phone"
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
className="bg-green-700 text-white p-3 rounded w-full"
>
Create Auction
</button>

</div>

)}

{/* MY AUCTIONS */}

{page==="list" && (

<div className="grid md:grid-cols-3 gap-6">

{auctions.map(a=>{

const closed = new Date(a.endTime)<new Date()

return(

<div
key={a._id}
className="bg-white p-6 rounded shadow"
>

<h2 className="text-xl font-bold">
{a.cropName}
</h2>

<p>Quantity: {a.quantity}kg</p>

<p className="text-green-600 font-semibold">
₹{a.basePrice}
</p>

{closed ? (
<p className="text-red-500">Closed</p>
):(
<p className="text-green-600">Live</p>
)}

</div>

)

})}

</div>

)}

{/* LIVE MARKET */}

{page==="market" && (

<div>

<h2 className="text-xl font-bold mb-4">
Live Market Prices
</h2>

<div className="grid md:grid-cols-4 gap-6">

{[
{crop:"Wheat",price:2275},
{crop:"Rice",price:3850},
{crop:"Cotton",price:6380},
{crop:"Soybean",price:4600}
].map((c,i)=>(

<div key={i} className="bg-white p-6 rounded shadow">

<h3 className="font-bold">{c.crop}</h3>

<p className="text-green-600 text-xl mt-2">
₹{c.price}
</p>

</div>

))}

</div>

</div>

)}

</div>

</div>

)

}