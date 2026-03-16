
import { useEffect, useState, useCallback } from "react";
import { getAllAuctions } from "../api/auctionApi";
import { AuctionCard } from "../components/AuctionCard";
import { BidForm } from "../components/BidForm";
import LoadingSpinner from "../components/LoadingSpinner";

export default function BuyerHome() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAuctions = useCallback(() => {
    getAllAuctions()
      .then((res) => setAuctions(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchAuctions();
  }, [fetchAuctions]);

  if (loading) return <LoadingSpinner />;

  const active = auctions.filter((a) => a.status === "active");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Browse Auctions</h1>

      {active.length === 0 ? (
        <p>No active auctions</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((a) => (
            <AuctionCard
              key={a._id}
              auction={a}
              actions={
                <BidForm
                  auctionId={a._id}
                  currentHighest={a.highestBid || a.basePrice}
                  onBidPlaced={fetchAuctions}
                />
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}



