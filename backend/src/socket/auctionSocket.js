const Bid = require("../models/Bid");
const Crop = require("../models/Crop");

module.exports = (io)=>{

io.on("connection",(socket)=>{

console.log("User Connected");

socket.on("placeBid",async(data)=>{

const {cropId,buyerId,bidAmount} = data;

const bid = new Bid({

cropId,
buyerId,
bidAmount

});

await bid.save();

await Crop.findByIdAndUpdate(cropId,{
currentBid:bidAmount
});

io.emit("newBid",data);

});

});

};