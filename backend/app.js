const express = require("express");
const app = express();
const cors = require("cors");
const user = require("./routes/user");
const book = require("./routes/book");
const cart = require("./routes/cart");
const fav = require("./routes/favourite");
const order = require("./routes/order");
require("dotenv").config();
const path = require("path");

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Connection to MongoDB and other configurations
require("./conn/conn");

// Calling Routes
app.use("/api/v1", user);
app.use("/api/v1", book);
app.use("/api/v1", cart);
app.use("/api/v1", fav);
app.use("/api/v1", order);

// Serve static files
app.use(express.static(path.resolve(__dirname, "frontend", "dist")));

// Serve index.html for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
