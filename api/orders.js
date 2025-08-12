let orders = new Map();

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { details } = req.body;
    if (!details || details.trim() === '') {
      res.status(400).json({ error: 'Order details required' });
      return;
    }

    let orderId;
    do {
      orderId = Math.floor(100 + Math.random() * 900).toString();
    } while (orders.has(orderId));

    orders.set(orderId, {
      id: orderId,
      details,
      status: 'open',
      createdAt: new Date(),
    });

    res.status(200).json({ orderId });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
