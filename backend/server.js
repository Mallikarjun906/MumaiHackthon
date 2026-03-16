require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./src/config/db");

// Routes
const authRoutes = require("./src/routes/authRoutes");
const cropRoutes = require("./src/routes/cropRoutes");
const fertilizerRoutes = require("./src/routes/fertilizerRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const auctionRoutes = require("./src/routes/auctionRoutes");

// Socket
const auctionSocket = require("./src/socket/auctionSocket");

// Connect MongoDB
connectDB();

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors());
app.use(express.json());

/* ================= ROUTES ================= */

app.get("/", (req, res) => {
  res.send("🌾 Agri Marketplace API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/fertilizers", fertilizerRoutes);
app.use("/api/orders", orderRoutes);


app.use("/api/auction", auctionRoutes);

/* ================= SERVER + SOCKET ================= */

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

/* ================= SOCKET EVENTS ================= */

auctionSocket(io);

/* ================= SERVER START ================= */

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});