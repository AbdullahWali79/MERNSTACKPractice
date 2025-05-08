const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  symptoms: {
    type: String,
    required: true
  },
  diagnosis: {
    type: String,
    required: true
  },
  prescription: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  visitDate: {
    type: Date,
    default: Date.now
  }
});

const Visit = mongoose.model("Visit", visitSchema);

module.exports = Visit; 