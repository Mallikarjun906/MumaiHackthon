import { useEffect,useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function AuctionPage(){

const [crops,setCrops] = useState([]);

useEffect(()=>{

axios.get("http://localhost:5000/api/crops")
.then(res=>setCrops(res.data))

},[])

const placeBid = (cropId)=>{

socket.emit("placeBid",{
cropId,
bidAmount:Math.floor(Math.random()*5000)
})

}

return(

<div>

<h2>Live Crop Auction</h2>

{crops.map(crop=>(
<div key={crop._id}>

<h3>{crop.cropName}</h3>
<p>Quantity: {crop.quantity}</p>
<p>Quality: {crop.quality}</p>

<button onClick={()=>placeBid(crop._id)}>
Place Bid
</button>

</div>
))}

</div>

)

}

export default AuctionPage