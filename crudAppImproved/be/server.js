const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const itemRoutes = require("./routes/Item");

dotenv.config();
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use("/api/items", itemRoutes);
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    // Start the server
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error(err));
