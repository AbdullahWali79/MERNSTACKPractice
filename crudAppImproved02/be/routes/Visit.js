const express = require("express");
const router = express.Router();
const Visit = require("../models/Visit");

// Create new visit
router.post("/", async (req, res) => {
  try {
    const visit = new Visit(req.body);
    const savedVisit = await visit.save();
    res.status(201).json(savedVisit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all visits for a patient
router.get("/patient/:patientId", async (req, res) => {
  try {
    const visits = await Visit.find({ patientId: req.params.patientId })
      .sort({ visitDate: -1 }); // Sort by visit date, newest first
    res.json(visits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get visit by ID
router.get("/:id", async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id);
    if (!visit) {
      return res.status(404).json({ message: "Visit not found" });
    }
    res.json(visit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 