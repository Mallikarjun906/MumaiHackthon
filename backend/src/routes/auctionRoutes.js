const express = require("express");
const router = express.Router();
const Auction = require("../models/Auction");

// Create auction (Farmer)
router.post("/create", async (req, res) => {

  const start = new Date();
  start.setHours(18,0,0);

  const end = new Date();
  end.setHours(22,0,0);

  const auction = new Auction({
    cropName:req.body.cropName,
    quantity:req.body.quantity,
    basePrice:req.body.basePrice,
    highestBid:req.body.basePrice,
    startTime:start,
    endTime:end
  });

  await auction.save();

  res.json(auction);
});


// Place bid (Buyer)

router.post("/bid/:id", async (req,res)=>{

const auction = await Auction.findById(req.params.id)

const now = new Date()

if(now > auction.endTime){
return res.json({message:"Auction closed"})
}

if(req.body.bid > auction.highestBid){

auction.highestBid = req.body.bid
auction.highestBidder = req.body.bidder

await auction.save()

}

res.json(auction)

})


// Get auctions

router.get("/", async(req,res)=>{

try{

const auctions = await Auction.find()

res.json(auctions)

}catch(error){

res.status(500).json({message:"Error fetching auctions"})

}

})


// Market price

router.get("/market-price", async(req,res)=>{

try{

const prices = await Auction.find({
status:"closed"
})

res.json(prices)

}catch(error){

res.status(500).json({message:"Error fetching prices"})

}

})

module.exports = router