require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
<<<<<<<<< Temporary merge branch 1

=========
>>>>>>>>> Temporary merge branch 2
const { Server } = require("socket.io");

const connectDB = require("./src/config/db");

// Routes
const authRoutes = require("./src/routes/authRoutes");
const cropRoutes = require("./src/routes/cropRoutes");
const fertilizerRoutes = require("./src/routes/fertilizerRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const productRoutes = require("./src/routes/productRoutes");
=========
const auctionRoutes = require("./src/routes/auctionRoutes");
>>>>>>>>> Temporary merge branch 2

// Socket
const auctionSocket = require("./src/socket/auctionSocket");

// Connect MongoDB
connectDB();

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

<<<<<<<<< Temporary merge branch 1
=========
/* ================= ROUTES ================= */

app.get("/", (req, res) => {
  res.send("🌾 Agri Marketplace API Running...");
});

>>>>>>>>> Temporary merge branch 2
app.use("/api/auth", authRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/fertilizers", fertilizerRoutes);
app.use("/api/orders", orderRoutes);
<<<<<<<<< Temporary merge branch 1
app.use("/api/products", productRoutes);
=========


app.use("/api/auction", auctionRoutes);

/* ================= SERVER + SOCKET ================= */
>>>>>>>>> Temporary merge branch 2

const server = http.createServer(app);

const io = new Server(server, {
<<<<<<<<< Temporary merge branch 1
  cors: { origin: "*" },
=========
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
>>>>>>>>> Temporary merge branch 2
});

/* ================= SOCKET EVENTS ================= */

auctionSocket(io);

/* ================= SERVER START ================= */

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
<<<<<<<<< Temporary merge branch 1
  console.log(`Server running on port ${PORT}`);
});
=========
  console.log(`🚀 Server running on port ${PORT}`);
});
