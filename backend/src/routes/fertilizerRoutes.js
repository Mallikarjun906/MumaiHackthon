const express = require("express");

const router = express.Router();

const Fertilizer = require("../models/Fertilizer");

router.post("/add",async(req,res)=>{

const fertilizer = new Fertilizer(req.body);

await fertilizer.save();

res.json(fertilizer);

});

router.get("/",async(req,res)=>{

const items = await Fertilizer.find();

res.json(items);

});

module.exports = router;