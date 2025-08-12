import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./index.css";

function App() {
  const [orderDetails, setOrderDetails] = useState("");
  const [message, setMessage] = useState("");

  const submitOrder = async () => {
    if (!orderDetails.trim()) {
      setMessage("Please enter order details.");
      return;
    }
    try {
      const response = await axios.post("/api/orders", {
        details: orderDetails,
      });
      setMessage(`Order submitted! Order ID: ${response.data.orderId}`);
      setOrderDetails("");
    } catch {
      setMessage("Error submitting order.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center p-6 font-sans">
      <div className="glass max-w-xl w-full p-8">
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
            Caiden’s Commissions
          </h1>
          <p className="mt-1 text-gray-300">
            Submit your commission order below
          </p>
        </header>

        <main>
          <textarea
            className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            rows={6}
            placeholder="Describe your commission here..."
            value={orderDetails}
            onChange={(e) => setOrderDetails(e.target.value)}
          />
          <button
            onClick={submitOrder}
            className="mt-6 w-full py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-semibold text-white shadow-lg transition"
          >
            Submit Order
          </button>
          {message && (
            <p className="mt-4 text-center text-gray-200 select-none">{message}</p>
          )}
        </main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
