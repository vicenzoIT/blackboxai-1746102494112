const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let orders = [];
let orderId = 1;

// Get all orders (admin)
app.get('/orders', (req, res) => {
  res.json(orders);
});

// Create new order (customer)
app.post('/orders', (req, res) => {
  const { customerName, items, total } = req.body;
  if (!customerName || !items || !total) {
    return res.status(400).json({ error: 'Missing order data' });
  }
  const newOrder = {
    id: orderId++,
    customerName,
    items,
    total,
    status: 'Pending',
    createdAt: new Date()
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Update order status (admin)
app.put('/orders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  const order = orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  if (!status) {
    return res.status(400).json({ error: 'Missing status' });
  }
  order.status = status;
  res.json(order);
});

app.listen(port, () => {
  console.log(`Milk Tea Shop backend listening at http://localhost:${port}`);
});
