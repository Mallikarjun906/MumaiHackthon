const Auction = require("../models/Auction");

module.exports = (io) => {

io.on("connection",(socket)=>{

console.log("User connected:",socket.id)

socket.on("placeBid", async(data)=>{

try{

const {auctionId, amount, bidder} = data

const auction = await Auction.findById(auctionId)

if(!auction) return

if(amount > auction.highestBid){

auction.highestBid = amount
auction.highestBidder = bidder

await auction.save()

const bidData = {
auctionId,
amount,
bidder,
time:new Date().toLocaleTimeString()
}

io.emit("newBid",bidData)

}

}catch(err){
console.log(err)
}

})

socket.on("disconnect",()=>{
console.log("User disconnected")
})

})

}