const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const path = require('path');
const Doctor = require('../models/Doctor');

// Export all data
router.get('/export-data', async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    const data = JSON.stringify(doctors, null, 2);
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=doctor-data.json');
    res.send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Import data
router.post('/import-data', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);

    // Clear existing data
    await Doctor.deleteMany({});

    // Insert new data
    await Doctor.insertMany(data);

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    res.json({ message: 'Data imported successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 