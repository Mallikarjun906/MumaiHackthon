import { useState, useEffect } from "react";
import axios from "axios";

const AuctionPage = () => {

const [auctions,setAuctions] = useState([])
const [bidAmount,setBidAmount] = useState("")

useEffect(()=>{
fetchAuctions()
},[])

const fetchAuctions = async()=>{

try{

const res = await axios.get(
"http://localhost:5000/api/auction"
)

setAuctions(res.data)

}catch(err){
console.log("Error fetching auctions")
}

}

const placeBid = async(id)=>{

try{

await axios.post(
`http://localhost:5001/api/auction/bid/${id}`,
{
bid:Number(bidAmount),
bidder:"Buyer"
}
)

setBidAmount("")
fetchAuctions()

}catch(err){

alert("Bid failed")

}

}

return (

<div className="min-h-screen bg-gray-100 p-8">

<h1 className="text-3xl font-bold mb-6">
Live Crop Auctions
</h1>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

{auctions.map((auction)=>(
<div
key={auction._id}
className="bg-white p-6 rounded-lg shadow"
>

<h2 className="text-xl font-bold">
{auction.cropName}
</h2>

<p>Quantity: {auction.quantity}</p>

<p className="text-green-600 font-semibold">
Highest Bid: ₹{auction.highestBid}
</p>

<input
type="number"
placeholder="Enter bid"
value={bidAmount}
onChange={(e)=>setBidAmount(e.target.value)}
className="border p-2 rounded w-full mt-3"
/>

<button
onClick={()=>placeBid(auction._id)}
className="bg-green-600 text-white px-4 py-2 rounded mt-3 w-full"
>

Place Bid

</button>

</div>
))}

</div>

</div>

)

}

export default AuctionPage