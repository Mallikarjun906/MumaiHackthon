const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  cropName: String,
  quantity: Number,
  basePrice: Number,
  highestBid: Number,
  highestBidder: String,
  startTime: Date,
  endTime: Date,
  status: {
    type: String,
    default: "active"
  }
});

module.exports = mongoose.model("Auction", auctionSchema);