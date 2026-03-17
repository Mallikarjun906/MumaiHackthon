import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Wheat, Gavel, ShoppingCart, TrendingUp, ArrowRight } from "lucide-react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

/* ── FULL SCREEN RESET ── */
html, body {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: #000 !important;
  overflow-x: hidden;
}
#root {
  width: 100% !important;
  min-height: 100vh !important;
  background: #000 !important;
}

/* Force the component to escape any parent container */
.bd-fullscreen-escape {
  position: fixed;
  inset: 0;
  z-index: 999;
  overflow-y: auto;
  background: #000;
}

.bd {
  --bg:    #000000;
  --bg1:   #0a0a0a;
  --bg2:   #111111;
  --bg3:   #161616;
  --line:  #1e1e1e;
  --line2: #2a2a2a;

  --lime:  #b5e550;
  --lime-d: rgba(181,229,80,.10);
  --lime-g: rgba(181,229,80,.20);

  --amber: #f5c842;
  --amber-d: rgba(245,200,66,.10);

  --terra: #e8714a;
  --terra-d: rgba(232,113,74,.10);

  --sky:   #6bc5e8;
  --sky-d: rgba(107,197,232,.10);

  --text:  #e8e8e8;
  --text2: #666666;
  --text3: #333333;

  --r:  12px;
  --rl: 16px;
  --t:  .18s cubic-bezier(.4,0,.2,1);

  --fd: 'Sora', sans-serif;
  --fb: 'DM Sans', sans-serif;
  --fm: 'JetBrains Mono', monospace;

  font-family: var(--fb);
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  width: 100%;
  padding: 36px 48px 60px;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

/* ── HEADER ── */
.bd-header {
  margin-bottom: 36px;
}
.bd-title {
  font-family: var(--fd);
  font-size: 32px;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -.6px;
  margin-bottom: 6px;
}
.bd-sub {
  font-size: 14px;
  color: var(--text2);
}

/* ── STATS ── */
.bd-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 40px;
}
.bd-stat {
  background: var(--bg1);
  border: 1px solid var(--line);
  border-radius: var(--rl);
  padding: 22px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  transition: border-color var(--t), transform var(--t);
  cursor: default;
  position: relative;
  overflow: hidden;
}
.bd-stat::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 2px;
  background: var(--ac, var(--lime));
  opacity: .45;
}
.bd-stat:nth-child(1) { --ac: var(--lime);  }
.bd-stat:nth-child(2) { --ac: var(--amber); }
.bd-stat:nth-child(3) { --ac: var(--sky);   }
.bd-stat:nth-child(4) { --ac: var(--terra); }
.bd-stat:hover {
  border-color: var(--line2);
  transform: translateY(-2px);
}
.bd-stat-icon {
  width: 46px; height: 46px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.bd-stat-lbl {
  font-size: 10px;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5px;
}
.bd-stat-val {
  font-family: var(--fd);
  font-size: 26px;
  font-weight: 800;
  color: var(--text);
  line-height: 1;
}

/* ── SECTION HEADER ── */
.bd-sec-hdr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.bd-sec-title {
  font-family: var(--fd);
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 8px;
}
.bd-view-all {
  background: none;
  border: none;
  color: var(--lime);
  font-size: 13px;
  cursor: pointer;
  font-family: var(--fd);
  font-weight: 600;
  transition: opacity var(--t);
}
.bd-view-all:hover { opacity: .7; }

/* ── AUCTION GRID ── */
.bd-auction-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 44px;
}
.bd-auction-card {
  background: var(--bg1);
  border: 1px solid var(--line);
  border-radius: var(--rl);
  padding: 22px;
  transition: border-color var(--t), transform var(--t), box-shadow var(--t);
  position: relative;
  overflow: hidden;
}
.bd-auction-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--lime), var(--sky));
}
.bd-auction-card:hover {
  border-color: var(--line2);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(0,0,0,.6);
}
.bd-auction-name {
  font-family: var(--fd);
  font-size: 17px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
}
.bd-auction-meta {
  font-size: 13px;
  color: var(--text2);
  margin-bottom: 4px;
}
.bd-auction-bid {
  font-family: var(--fm);
  font-size: 22px;
  color: var(--lime);
  font-weight: 600;
  margin: 12px 0 18px;
}

/* ── CROP GRID ── */
.bd-crop-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}
.bd-crop-card {
  background: var(--bg1);
  border: 1px solid var(--line);
  border-radius: var(--rl);
  padding: 22px;
  transition: border-color var(--t), transform var(--t), box-shadow var(--t);
  position: relative;
  overflow: hidden;
}
.bd-crop-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--amber), transparent);
}
.bd-crop-card:hover {
  border-color: var(--line2);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(0,0,0,.6);
}
.bd-crop-name {
  font-family: var(--fd);
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 6px;
}
.bd-crop-qty {
  font-size: 13px;
  color: var(--text2);
  margin-bottom: 6px;
}
.bd-crop-price {
  font-family: var(--fm);
  font-size: 19px;
  color: var(--amber);
  font-weight: 500;
  margin: 10px 0 18px;
}

/* ── BUTTONS ── */
.bd-btn {
  width: 100%;
  padding: 11px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-family: var(--fd);
  font-size: 13px;
  font-weight: 700;
  transition: all var(--t);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
}
.bd-btn-green {
  background: var(--lime);
  color: #000;
}
.bd-btn-green:hover {
  background: #c8f060;
  box-shadow: 0 0 18px rgba(181,229,80,.3);
}
.bd-btn-blue {
  background: var(--sky-d);
  color: var(--sky);
  border: 1px solid rgba(107,197,232,.2);
}
.bd-btn-blue:hover {
  background: rgba(107,197,232,.18);
}

/* ── EMPTY ── */
.bd-empty {
  grid-column: 1 / -1;
  text-align: center;
  padding: 64px 20px;
  background: var(--bg1);
  border: 1px solid var(--line);
  border-radius: var(--rl);
}
.bd-empty-icon  { font-size: 40px; margin-bottom: 12px; opacity: .2; }
.bd-empty-title { font-family: var(--fd); font-size: 17px; color: var(--text2); margin-bottom: 5px; }
.bd-empty-sub   { font-size: 13px; color: var(--text3); }

/* ── RESPONSIVE ── */
@media (max-width: 1100px) { .bd-stats { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px)  { .bd { padding: 20px 18px 40px; } .bd-stats { grid-template-columns: 1fr 1fr; } }
@media (max-width: 400px)  { .bd-stats { grid-template-columns: 1fr; } }
`;

const BuyerDashboard = () => {
  const [crops,    setCrops]    = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [orders,   setOrders]   = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [cropsRes, auctionRes, ordersRes] = await Promise.all([
        axios.get("http://localhost:5001/api/crops"),
        axios.get("http://localhost:5001/api/auction"),
        axios.get("http://localhost:5001/api/orders"),
      ]);
      setCrops(cropsRes.data);
      setAuctions(auctionRes.data);
      setOrders(ordersRes.data);
    } catch (err) { console.log("Error fetching dashboard data"); }
  };

  const stats = [
    { label: "Available Crops", value: crops.length,    icon: Wheat,        bg: "rgba(181,229,80,.1)",  color: "#b5e550" },
    { label: "Active Auctions", value: auctions.length, icon: Gavel,        bg: "rgba(245,200,66,.1)",  color: "#f5c842" },
    { label: "My Orders",       value: orders.length,   icon: ShoppingCart, bg: "rgba(107,197,232,.1)", color: "#6bc5e8" },
    { label: "Total Bids",      value: auctions.length, icon: TrendingUp,   bg: "rgba(232,113,74,.1)",  color: "#e8714a" },
  ];

  return (
    /* fullscreen escape wrapper */
    <div className="bd-fullscreen-escape">
      <div className="bd">

        {/* HEADER */}
        <div className="bd-header">
          <div className="bd-title">Buyer Dashboard</div>
          <div className="bd-sub">Browse crops, join live auctions and track your orders</div>
        </div>

        {/* STATS */}
        <div className="bd-stats">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="bd-stat">
                <div className="bd-stat-icon" style={{ background: s.bg }}>
                  <Icon size={22} color={s.color} />
                </div>
                <div>
                  <div className="bd-stat-lbl">{s.label}</div>
                  <div className="bd-stat-val">{s.value}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* LIVE AUCTIONS */}
        <div className="bd-sec-hdr">
          <span className="bd-sec-title">⚡ Live Auctions</span>
          <button className="bd-view-all" onClick={() => navigate("/auction")}>
            View All →
          </button>
        </div>
        <div className="bd-auction-grid">
          {auctions.map((auction) => (
            <div key={auction._id} className="bd-auction-card">
              <div className="bd-auction-name">{auction.cropName}</div>
              <div className="bd-auction-meta">Qty: {auction.quantity}</div>
              <div className="bd-auction-bid">₹{auction.highestBid || "—"}</div>
              <button className="bd-btn bd-btn-green" onClick={() => navigate("/auction")}>
                <Gavel size={14} /> Join Auction
              </button>
            </div>
          ))}
          {auctions.length === 0 && (
            <div className="bd-empty">
              <div className="bd-empty-icon">🔨</div>
              <div className="bd-empty-title">No active auctions</div>
              <div className="bd-empty-sub">Check back soon for live crop auctions</div>
            </div>
          )}
        </div>

        {/* AVAILABLE CROPS */}
        <div className="bd-sec-hdr">
          <span className="bd-sec-title">🌾 Available Crops</span>
        </div>
        <div className="bd-crop-grid">
          {crops.map((crop) => (
            <div key={crop._id} className="bd-crop-card">
              <div className="bd-crop-name">{crop.cropName}</div>
              <div className="bd-crop-qty">Quantity: {crop.quantity}</div>
              <div className="bd-crop-price">Min ₹{crop.minPrice}</div>
              <button className="bd-btn bd-btn-blue" onClick={() => navigate(`/auction/${crop._id}`)}>
                <ArrowRight size={14} /> Place Bid
              </button>
            </div>
          ))}
          {crops.length === 0 && (
            <div className="bd-empty">
              <div className="bd-empty-icon">🌿</div>
              <div className="bd-empty-title">No crops available</div>
              <div className="bd-empty-sub">Farmers will list crops soon</div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default BuyerDashboard;