const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  address: { 
    type: String, 
    required: true 
  },
  phoneNumber: { 
    type: String, 
    required: true 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient; 