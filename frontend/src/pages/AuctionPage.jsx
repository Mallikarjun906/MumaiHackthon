import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

const AuctionPage = () => {

const [auctions,setAuctions] = useState([])
const [selectedAuction,setSelectedAuction] = useState(null)
const [bidAmount,setBidAmount] = useState("")
const [liveBids,setLiveBids] = useState([])
const [highestBid,setHighestBid] = useState(0)

useEffect(()=>{

fetchAuctions()

socket.on("newBid",(bid)=>{

setLiveBids(prev => [bid,...prev])

setHighestBid(bid.amount)

})

return ()=> socket.off("newBid")

},[])

const fetchAuctions = async()=>{

const res = await axios.get(
"http://localhost:5001/api/auction"
)

setAuctions(res.data)

}

const placeBid = ()=>{

const amount = Number(bidAmount)

socket.emit("placeBid",{
auctionId:selectedAuction._id,
amount,
bidder:"Buyer"
})

setBidAmount("")

}

return (

<div className="min-h-screen bg-gray-100 p-8">

<h1 className="text-3xl font-bold mb-6">
Live Crop Auctions
</h1>

{selectedAuction ? (

<div className="grid md:grid-cols-2 gap-6">

<div className="bg-white p-6 rounded shadow">

<h2 className="text-xl font-bold">
{selectedAuction.cropName}
</h2>

<p>Quantity: {selectedAuction.quantity}</p>

<p className="text-green-600 font-semibold">
Highest Bid: ₹{highestBid || selectedAuction.basePrice}
</p>

<p className="text-sm text-gray-500">
Highest Bidder: {selectedAuction.highestBidder || "No bids yet"}
</p>

<input
type="number"
placeholder="Enter bid"
value={bidAmount}
onChange={(e)=>setBidAmount(e.target.value)}
className="border p-2 rounded w-full mt-3"
/>

<button
onClick={placeBid}
className="bg-green-600 text-white px-4 py-2 rounded mt-3 w-full"
>

Place Bid

</button>

<button
onClick={()=>setSelectedAuction(null)}
className="mt-4 text-blue-600"
>

Back

</button>

</div>

<div className="bg-white p-6 rounded shadow">

<h3 className="text-lg font-bold mb-4">
Live Bids
</h3>

{liveBids.map((bid,i)=>(
<div
key={i}
className="flex justify-between border-b py-2"
>

<div>

<p className="text-sm font-semibold">
{bid.bidder}
</p>

<p className="text-xs text-gray-500">
{bid.time}
</p>

</div>

<p className="text-green-600 font-bold">
₹{bid.amount}
</p>

</div>
))}

</div>

</div>

) : (

<div className="grid md:grid-cols-3 gap-6">

{auctions.map((auction)=>(
<div
key={auction._id}
className="bg-white p-6 rounded shadow"
>

<h2 className="text-xl font-bold">
{auction.cropName}
</h2>

<p>Quantity: {auction.quantity}</p>

<p className="text-green-600">
Base Price: ₹{auction.basePrice}
</p>

<button
onClick={()=>{
setSelectedAuction(auction)
setHighestBid(auction.highestBid)
}}
className="bg-blue-600 text-white px-4 py-2 rounded mt-3 w-full"
>

Join Auction

</button>

</div>
))}

</div>

)}

</div>

)

}

export default AuctionPage