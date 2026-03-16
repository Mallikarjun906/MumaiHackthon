const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  fertilizerId:String,

  farmerId:String,

  status:{
    type:String,
    default:"pending"
  }

});

module.exports = mongoose.model("Order",orderSchema);