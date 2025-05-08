const express = require("express");
const Item = require("../models/Item"); // Assuming you have a model defined in models/Item.js
const router = express.Router();
// Create
router.post("/", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Read
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Update
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Delete
router.delete("/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Export the router
module.exports = router;
