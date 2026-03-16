import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Wheat, Gavel, ShoppingCart, TrendingUp } from "lucide-react";

const BuyerDashboard = () => {

const [crops,setCrops] = useState([])
const [auctions,setAuctions] = useState([])
const [orders,setOrders] = useState([])

const navigate = useNavigate()

useEffect(()=>{
fetchData()
},[])

const fetchData = async()=>{

try{

const cropsRes = await axios.get("http://localhost:5001/api/crops")
const auctionRes = await axios.get("http://localhost:5001/api/auction")
const ordersRes = await axios.get("http://localhost:5001/api/orders")

setCrops(cropsRes.data)
setAuctions(auctionRes.data)
setOrders(ordersRes.data)

}catch(err)
{
console.log("Error fetching dashboard data")
}

}

const stats = [
{ label:"Available Crops", value:crops.length, icon:Wheat },
{ label:"Active Auctions", value:auctions.length, icon:Gavel },
{ label:"My Orders", value:orders.length, icon:ShoppingCart },
{ label:"Total Bids", value:auctions.length, icon:TrendingUp }
]

return (

<div className="min-h-screen bg-gray-100 p-8">

{/* HEADER */}

<div className="mb-8">
<h1 className="text-3xl font-bold">Buyer Dashboard</h1>
<p className="text-gray-500 mt-1">Browse crops and place bids</p>
</div>

{/* STATS */}

<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

{stats.map((s,i)=>{
const Icon = s.icon

return(

<div key={i} className="bg-white p-6 rounded-lg shadow flex items-center gap-4">

<Icon className="text-green-600" size={32}/>

<div>
<p className="text-gray-500 text-sm">{s.label}</p>
<h2 className="text-xl font-bold">{s.value}</h2>
</div>

</div>

)

})}

</div>


{/* AUCTION SECTION */}

<h2 className="text-xl font-bold mb-4">Live Auctions</h2>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

{auctions.map((auction)=>(
<div
key={auction._id}
className="bg-white p-6 rounded-lg shadow"
>

<h3 className="text-lg font-bold mb-2">
{auction.cropName}
</h3>

<p>Quantity: {auction.quantity}</p>

<p className="text-green-600 font-semibold">
Highest Bid: ₹{auction.highestBid}
</p>

<button
onClick={()=>navigate("/auction")}
className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full"
>
Join Auction
</button>

</div>
))}

{auctions.length === 0 && (
<div className="col-span-full bg-white p-8 rounded text-center">
<Gavel className="mx-auto mb-3 text-gray-400" size={40}/>
<p className="text-gray-500">No active auctions right now</p>
</div>
)}

</div>


{/* CROPS */}

<h2 className="text-xl font-bold mb-4">Available Crops</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

{crops.map((crop)=>(
<div key={crop._id} className="bg-white p-6 rounded-lg shadow">

<h3 className="text-lg font-bold mb-2">{crop.cropName}</h3>

<p>Quantity: {crop.quantity}</p>

<p className="text-green-600 font-semibold">
Min Price: ₹{crop.minPrice}
</p>

<button
onClick={()=>navigate(`/auction/${crop._id}`)}
className="bg-blue-600 text-white px-4 py-2 rounded mt-4 w-full"
>
Place Bid
</button>

</div>
))}

{crops.length === 0 && (
<div className="col-span-full bg-white p-12 rounded-lg text-center">
<Wheat className="mx-auto mb-4 text-gray-400" size={40}/>
<p className="text-gray-500">No crops available right now</p>
</div>
)}

</div>

</div>

)

}

export default BuyerDashboard