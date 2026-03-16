import { useState, useEffect } from "react"
import axios from "axios"

import {
LayoutDashboard,
PlusCircle,
List,
Sprout,
FlaskConical,
Leaf,
MessageCircle
} from "lucide-react"

export default function FarmerDashboard(){

const [page,setPage] = useState("dashboard")

/* AUCTIONS */

const [cropName,setCropName] = useState("")
const [quantity,setQuantity] = useState("")
const [basePrice,setBasePrice] = useState("")
const [farmerName,setFarmerName] = useState("")
const [farmerPhone,setFarmerPhone] = useState("")
const [startTime,setStartTime] = useState("")
const [endTime,setEndTime] = useState("")

const [auctions,setAuctions] = useState([])
const [fertilizers,setFertilizers] = useState([])

/* ORDER STATES */

const [showOrder,setShowOrder] = useState(false)
const [selectedProduct,setSelectedProduct] = useState(null)

const [phone,setPhone] = useState("")
const [location,setLocation] = useState("")
const [paymentMethod,setPaymentMethod] = useState("COD")

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
console.log("Error fetching auctions")
}

}

/* FETCH FERTILIZERS */

const fetchFertilizers = async()=>{

try{

const res = await axios.get(
"http://localhost:5001/api/products"
)

setFertilizers(res.data)

}catch(err){
console.log("Error fetching fertilizers")
}

}

/* PAGE CHANGE */

useEffect(()=>{

if(page==="fertilizers"){
fetchFertilizers()
}

},[page])

/* CREATE AUCTION */

const createAuction = async()=>{

try{

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

fetchAuctions()

}catch(err){

alert("Error creating auction")

}

}

/* PLACE ORDER */

const placeOrder = async()=>{

if(paymentMethod==="UPI"){

const payment = await axios.post(
"http://localhost:5001/api/orders/create-payment",
{
amount:selectedProduct.price
}
)

const options = {

key:"YOUR_RAZORPAY_KEY",

amount:payment.data.amount,

order_id:payment.data.id,

handler:async function(){

await axios.post(
"http://localhost:5001/api/orders/create",
{
productId:selectedProduct._id,
phone,
location,
paymentMethod:"UPI"
}
)

alert("Order Successful")

setShowOrder(false)

}

}

const rzp = new window.Razorpay(options)

rzp.open()

}else{

await axios.post(
"http://localhost:5001/api/orders/create",
{
productId:selectedProduct._id,
phone,
location,
paymentMethod:"COD"
}
)

alert("Order Placed")

setShowOrder(false)

}

}

return(

<div className="flex min-h-screen bg-gray-100">

{/* SIDEBAR */}

<div className="w-64 bg-green-800 text-white p-6 space-y-6">

<h2 className="text-2xl font-bold">
Smart Agri
</h2>

<button onClick={()=>setPage("dashboard")} className="flex items-center gap-2 w-full hover:bg-green-700 p-2 rounded">
<LayoutDashboard size={18}/> Dashboard
</button>

<button onClick={()=>setPage("createAuction")} className="flex items-center gap-2 w-full hover:bg-green-700 p-2 rounded">
<PlusCircle size={18}/> Create Auction
</button>

<button onClick={()=>setPage("listItems")} className="flex items-center gap-2 w-full hover:bg-green-700 p-2 rounded">
<List size={18}/> My Listings
</button>

<button onClick={()=>setPage("fertilizers")} className="flex items-center gap-2 w-full hover:bg-green-700 p-2 rounded">
<FlaskConical size={18}/> Buy Fertilizers
</button>

<button onClick={()=>setPage("schemes")} className="flex items-center gap-2 w-full hover:bg-green-700 p-2 rounded">
<Leaf size={18}/> Government Schemes
</button>

<button onClick={()=>setPage("soil")} className="flex items-center gap-2 w-full hover:bg-green-700 p-2 rounded">
<Sprout size={18}/> Soil Analyzer
</button>

<button onClick={()=>setPage("chat")} className="flex items-center gap-2 w-full hover:bg-green-700 p-2 rounded">
<MessageCircle size={18}/> Farmer Chat
</button>

</div>

{/* MAIN */}

<div className="flex-1 p-8">

{/* DASHBOARD */}

{page==="dashboard" &&(

<div>

<h1 className="text-3xl font-bold mb-6">
Farmer Dashboard
</h1>

<div className="grid md:grid-cols-3 gap-6">

<div className="bg-white p-6 rounded shadow">
<h3 className="font-bold">Total Auctions</h3>
<p className="text-2xl">{auctions.length}</p>
</div>

<div className="bg-white p-6 rounded shadow">
<h3 className="font-bold">Active Auctions</h3>
<p className="text-2xl">
{auctions.filter(a=>new Date(a.endTime)>new Date()).length}
</p>
</div>

<div className="bg-white p-6 rounded shadow">
<h3 className="font-bold">Closed Auctions</h3>
<p className="text-2xl">
{auctions.filter(a=>new Date(a.endTime)<new Date()).length}
</p>
</div>

</div>

</div>

)}

{/* CREATE AUCTION */}

{page==="createAuction" &&(

<div className="bg-white p-6 rounded shadow max-w-xl">

<h1 className="text-2xl font-bold mb-6">
Create Auction
</h1>

<input placeholder="Farmer Name" onChange={(e)=>setFarmerName(e.target.value)} className="border p-2 w-full mb-3"/>

<input placeholder="Farmer Phone" onChange={(e)=>setFarmerPhone(e.target.value)} className="border p-2 w-full mb-3"/>

<input placeholder="Crop Name" onChange={(e)=>setCropName(e.target.value)} className="border p-2 w-full mb-3"/>

<input placeholder="Quantity" onChange={(e)=>setQuantity(e.target.value)} className="border p-2 w-full mb-3"/>

<input placeholder="Base Price" onChange={(e)=>setBasePrice(e.target.value)} className="border p-2 w-full mb-3"/>

<label>Start Time</label>

<input type="datetime-local" onChange={(e)=>setStartTime(e.target.value)} className="border p-2 w-full mb-3"/>

<label>End Time</label>

<input type="datetime-local" onChange={(e)=>setEndTime(e.target.value)} className="border p-2 w-full mb-3"/>

<button onClick={createAuction} className="bg-green-600 text-white p-3 rounded w-full">
Create Auction
</button>

</div>

)}

{/* FERTILIZERS */}

{page==="fertilizers" &&(

<div>

<h1 className="text-2xl font-bold mb-6">
Buy Fertilizers
</h1>

<div className="grid md:grid-cols-3 gap-6">

{fertilizers.map((f)=>(
<div key={f._id} className="bg-white p-6 rounded shadow">

{f.image &&(
<img
src={`http://localhost:5001${f.image}`}
className="h-32 w-full object-cover rounded mb-3"
/>
)}

<h2 className="font-bold text-lg">{f.name}</h2>

<p className="text-gray-500 text-sm">{f.description}</p>

<p className="text-green-600 font-bold mt-2">₹{f.price}</p>

<p className="text-gray-400 text-sm">Stock: {f.quantity}</p>

<button
onClick={()=>{

setSelectedProduct(f)
setShowOrder(true)

}}
className="mt-3 bg-green-600 text-white px-4 py-2 rounded w-full"
>

Buy Now

</button>

</div>
))}

</div>

</div>

)}

</div>

{/* ORDER MODAL */}

{showOrder &&(

<div className="fixed inset-0 bg-black/40 flex items-center justify-center">

<div className="bg-white p-6 rounded w-96">

<h2 className="text-xl font-bold mb-4">
Complete Order
</h2>

<input
placeholder="Phone Number"
className="border p-2 w-full mb-3"
onChange={(e)=>setPhone(e.target.value)}
/>

<input
placeholder="Delivery Location"
className="border p-2 w-full mb-3"
onChange={(e)=>setLocation(e.target.value)}
/>

<select
className="border p-2 w-full mb-4"
onChange={(e)=>setPaymentMethod(e.target.value)}
>

<option value="COD">Cash on Delivery</option>
<option value="UPI">UPI Payment</option>

</select>

<button
onClick={placeOrder}
className="bg-green-600 text-white px-4 py-2 rounded w-full"
>

Place Order

</button>

</div>

</div>

)}

</div>

)

}