const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')
const app = express();
const cors = require('cors');
const jsonParser = bodyParser.json();
const PORT = process.env.PORT || 3001;
const urlencodedParser = bodyParser.urlencoded({ extended: false });

let storage = [
  { name: "Croissant", stock: 12, price: 1.7 },
  { name: "Bread", stock: 7, price: 1.5 },
  { name: "Cupcake", stock: 25, price: 1.6 },
  { name: "Pretzel", stock: 18, price: 0.8 },
  { name: "Muffin", stock: 31, price: 2.3 },
  { name: "Pancake", stock: 10, price: 1.5 },
  { name: "Waffle", stock: 14, price: 2.2 },
  { name: "Cake", stock: 3, price: 8.5 },
];

app.use(cors())

app.get("/api/storage", urlencodedParser, (req, res) => {
  res.json({ storage });
});

app.post("/api/order", jsonParser, (req, res) => {
  const items = req.body.items;
  let error = "";
  let errorItem = "";

  items.every((item) => {
    const filtered = storage.filter((el) => el.name === item.name);
    const match = filtered.length ? filtered[0] : null;

    if (item.quantity > match.stock) {
      error = `There are not enough ${item.name} in stock`;
      errorItem = match.name;
      return false;
    }

    match.stock = match.stock - item.quantity;
    return true;
  });

  if (error) {
    return res.status(400).json({ error, errorItem });
  }
  res.json({ message: "success" });
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '/../client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
