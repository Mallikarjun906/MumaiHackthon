import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
TimeScale,
Tooltip,
Legend
} from "chart.js";

import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";
import "chartjs-adapter-date-fns";
import { Chart } from "react-chartjs-2";

ChartJS.register(
CategoryScale,
LinearScale,
TimeScale,
CandlestickController,
CandlestickElement,
Tooltip,
Legend
);

const socket = io("http://localhost:5001");

const AuctionPage = () => {

const [auctions,setAuctions] = useState([])
const [selectedAuction,setSelectedAuction] = useState(null)

const [bidAmount,setBidAmount] = useState("")
const [liveBids,setLiveBids] = useState([])

const [highestBid,setHighestBid] = useState(0)
const [highestBidder,setHighestBidder] = useState("")

const [candleData,setCandleData] = useState([])
const [timeLeft,setTimeLeft] = useState("")

const user = JSON.parse(localStorage.getItem("user"))

/* FETCH AUCTIONS */

useEffect(()=>{

fetchAuctions()

socket.on("newBid",(bid)=>{

setLiveBids(prev=>[bid,...prev])

setHighestBid(bid.amount)
setHighestBidder(bid.bidder)

if(selectedAuction){
setSelectedAuction(prev=>({
...prev,
highestBid:bid.amount,
highestBidder:bid.bidder
}))
}

setCandleData(prev=>[
...prev,
{
x:new Date(),
o:prev.length?prev[prev.length-1].c:bid.amount,
h:bid.amount,
l:bid.amount,
c:bid.amount
}
])

})

return ()=>socket.off("newBid")

},[selectedAuction])

/* TIMER */

useEffect(()=>{

if(!selectedAuction) return

const timer = setInterval(()=>{

const now = new Date()
const end = new Date(selectedAuction.endTime)

const diff = end-now

if(diff <= 0){
setTimeLeft("Auction Closed")
clearInterval(timer)
return
}

const minutes = Math.floor(diff/60000)
const seconds = Math.floor((diff%60000)/1000)

setTimeLeft(`${minutes}m ${seconds}s`)

},1000)

return ()=>clearInterval(timer)

},[selectedAuction])

/* FETCH AUCTIONS */

const fetchAuctions = async()=>{

try{

const res = await axios.get(
"http://localhost:5001/api/auction"
)

setAuctions(res.data)

}catch(err){

console.log("Error fetching auctions")

}

}

/* PLACE BID */

const placeBid = async()=>{

const amount = Number(bidAmount)

if(!amount) return

try{

await axios.post(
`http://localhost:5001/api/auction/bid/${selectedAuction._id}`,
{
bid:amount,
bidder:user?.name || "Buyer"
}
)

socket.emit("placeBid",{
auctionId:selectedAuction._id,
amount,
bidder:user?.name || "Buyer"
})

setBidAmount("")

}catch(err){

console.log("Bid failed")

}

}

const checkAuctionClosed=(endTime)=>{
return new Date(endTime) < new Date()
}

/* CHART DATA */

const chartData = {
datasets:[
{
label:"Live Auction Price",
data:candleData,
borderColor:"green",
color:{
up:"#16a34a",
down:"#dc2626",
unchanged:"#999"
}
}
]
}

const options={
responsive:true,
plugins:{
legend:{display:true}
},
scales:{
x:{
type:"time",
time:{unit:"minute"}
}
}
}

return(

<div className="min-h-screen bg-gray-100 p-8">

<h1 className="text-3xl font-bold mb-6">
Live Crop Auctions
</h1>

{selectedAuction ? (

<div className="grid md:grid-cols-2 gap-6">

{/* AUCTION INFO */}

<div className="bg-white p-6 rounded shadow">

<h2 className="text-xl font-bold">
{selectedAuction.cropName}
</h2>

<p>Quantity: {selectedAuction.quantity}</p>

<p>Farmer: {selectedAuction.farmerName}</p>

<p>Contact: {selectedAuction.farmerPhone}</p>

<p className="text-green-600 font-semibold">
Highest Bid: ₹{highestBid || selectedAuction.basePrice}
</p>

<p className="text-sm text-gray-500">
Highest Bidder: {highestBidder || "No bids yet"}
</p>

<p className="text-red-500">
Time Left: {timeLeft}
</p>

<input
type="number"
placeholder="Enter bid"
value={bidAmount}
onChange={(e)=>setBidAmount(e.target.value)}
disabled={checkAuctionClosed(selectedAuction.endTime)}
className="border p-2 rounded w-full mt-3"
/>

<button
onClick={placeBid}
disabled={checkAuctionClosed(selectedAuction.endTime)}
className="bg-green-600 text-white px-4 py-2 rounded mt-3 w-full disabled:bg-gray-400"
>
Place Bid
</button>

<button
onClick={()=>setSelectedAuction(null)}
className="mt-4 text-blue-600"
>
Back
</button>

{/* TRADING CHART */}

<div className="mt-6">

<h3 className="font-bold mb-3">
Live Trading Chart
</h3>

<Chart
type="candlestick"
data={chartData}
options={options}
/>

</div>

</div>

{/* LIVE BIDS */}

<div className="bg-white p-6 rounded shadow">

<h3 className="text-lg font-bold mb-4">
Live Bids
</h3>

{liveBids.length === 0 && (
<p className="text-gray-500">No bids yet</p>
)}

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

{auctions.map((auction)=>{

const closed = checkAuctionClosed(auction.endTime)

return(

<div
key={auction._id}
className="bg-white p-6 rounded shadow"
>

<h2 className="text-xl font-bold">
{auction.cropName}
</h2>

<p>Quantity: {auction.quantity}</p>

<p>Farmer: {auction.farmerName}</p>

<p>Contact: {auction.farmerPhone}</p>

<p className="text-green-600">
Base Price: ₹{auction.basePrice}
</p>

<p className="text-red-500">
Ends: {new Date(auction.endTime).toLocaleString()}
</p>

{closed ? (
<div className="bg-red-100 text-red-600 text-center p-2 rounded mt-2">
Auction Closed
</div>
) : (
<div className="bg-green-100 text-green-600 text-center p-2 rounded mt-2">
Live Auction
</div>
)}

<button
onClick={()=>{

setSelectedAuction(auction)

setHighestBid(auction.highestBid)

setHighestBidder(auction.highestBidder)

setCandleData([
{
x:new Date(),
o:auction.basePrice,
h:auction.basePrice,
l:auction.basePrice,
c:auction.basePrice
}
])

}}
disabled={closed}
className="bg-blue-600 text-white px-4 py-2 rounded mt-3 w-full disabled:bg-gray-400"
>
Join Auction
</button>

</div>

)

})}

</div>

)}

</div>

)

}

export default AuctionPage