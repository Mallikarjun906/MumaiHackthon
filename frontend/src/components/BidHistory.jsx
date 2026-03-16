import { User, IndianRupee } from "lucide-react";

export function BidHistory({ bids }) {

  return (
    <div className="rounded-lg border bg-white shadow">

      <div className="border-b p-4">

        <h3 className="font-semibold">
          Live Bidders
        </h3>

        <p className="text-xs text-gray-500">
          {bids.length} bid{bids.length !== 1 ? "s" : ""} placed
        </p>

      </div>

      <div className="h-64 overflow-y-auto">

        {bids.length === 0 ? (

          <p className="p-4 text-sm text-gray-500 text-center">
            No bids yet
          </p>

        ) : (

          <div className="divide-y">

            {bids.map((bid, i) => (

              <div
                key={i}
                className="flex items-center justify-between p-3 hover:bg-gray-100 transition-colors"
              >

                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">

                    <User className="h-4 w-4 text-green-600" />

                  </div>

                  <div>

                    <p className="text-sm font-medium">
                      {bid.bidderName}
                    </p>

                    <p className="text-xs text-gray-500">
                      {new Date(bid.time).toLocaleTimeString()}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-1 text-sm font-bold text-green-600">

                  <IndianRupee className="h-3.5 w-3.5" />

                  {bid.amount.toLocaleString()}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}