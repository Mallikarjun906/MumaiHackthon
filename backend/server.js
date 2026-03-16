require("dotenv").config();
const express = require("express");

const cors = require("cors");

const http = require("http");

const {Server} = require("socket.io");



const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");
const cropRoutes = require("./src/routes/cropRoutes");
const fertilizerRoutes = require("./src/routes/fertilizerRoutes");
const orderRoutes = require("./src/routes/orderRoutes");

const auctionSocket = require("./src/socket/auctionSocket");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/crops",cropRoutes);
app.use("/api/fertilizers",fertilizerRoutes);
app.use("/api/orders",orderRoutes);

const server = http.createServer(app);

const io = new Server(server,{
cors:{origin:"*"}
});

auctionSocket(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});