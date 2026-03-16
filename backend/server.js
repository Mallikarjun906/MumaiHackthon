require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");

const {Server} = require("socket.io");



const connectDB = require("./src/config/db");

// Routes
const authRoutes = require("./src/routes/authRoutes");
const cropRoutes = require("./src/routes/cropRoutes");
const fertilizerRoutes = require("./src/routes/fertilizerRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const productRoutes = require("./src/routes/productRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");

// Socket
const auctionSocket = require("./src/socket/auctionSocket");

// Connect MongoDB
connectDB();

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",authRoutes);
app.use("/api/crops",cropRoutes);
app.use("/api/fertilizers",fertilizerRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/products",productRoutes);
app.use("/api/notifications",notificationRoutes);

const server = http.createServer(app);

const io = new Server(server,{
cors:{origin:"*"}
});

/* ================= SOCKET EVENTS ================= */

auctionSocket(io);

/* ================= SERVER START ================= */

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
