import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './index.css';

function App() {
  const [orderDetails, setOrderDetails] = useState('');
  const [message, setMessage] = useState('');

  const submitOrder = async () => {
    if (!orderDetails.trim()) {
      setMessage('Please enter order details.');
      return;
    }
    try {
      const response = await axios.post('/api/orders', {
        details: orderDetails,
      });
      setMessage(`Order submitted! Order ID: ${response.data.orderId}`);
      setOrderDetails('');
    } catch {
      setMessage('Error submitting order.');
    }
  };

  return (
    <div className="min-h-screen bg-background text-white font-sans p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Caiden’s Commissions</h1>
      </header>

      <main>
        <section className="max-w-xl mx-auto">
          <h2 className="text-xl mb-4">Place a new commission order</h2>
          <textarea
            className="w-full p-3 rounded bg-primary text-white resize-none"
            rows={5}
            placeholder="Describe your commission here..."
            value={orderDetails}
            onChange={(e) => setOrderDetails(e.target.value)}
          />
          <button
            onClick={submitOrder}
            className="mt-4 bg-accent px-6 py-2 rounded hover:bg-secondary transition"
          >
            Submit Order
          </button>
          {message && <p className="mt-3">{message}</p>}
        </section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
