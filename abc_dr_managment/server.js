const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://abdullahwale:abdullahwale123@cluster0.2uoxg0v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => {
    console.log('MongoDB Connection Error:', err.message);
    console.log('Please check your username and password in the connection string');
});

// Define Schemas
const patientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    contactNumber: String,
    address: String,
    medicalHistory: [{
        visitDate: Date,
        symptoms: String,
        diagnosis: String,
        prescription: String,
        notes: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const doctorSchema = new mongoose.Schema({
    name: String,
    specialization: String,
    contactNumber: String,
    email: String,
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Patient = mongoose.model('Patient', patientSchema);
const Doctor = mongoose.model('Doctor', doctorSchema);

// Doctor Routes
app.post('/api/doctors', async (req, res) => {
    try {
        const newDoctor = new Doctor(req.body);
        const savedDoctor = await newDoctor.save();
        res.json(savedDoctor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/api/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find().populate('patients');
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Patient Routes
app.post('/api/patients', async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        const savedPatient = await newPatient.save();
        res.json(savedPatient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/api/patients', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add patient visit history
app.post('/api/patients/:id/visits', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        patient.medicalHistory.push(req.body);
        const updatedPatient = await patient.save();
        res.json(updatedPatient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get patient visit history
app.get('/api/patients/:id/visits', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient.medicalHistory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Assign patient to doctor
app.post('/api/doctors/:doctorId/patients/:patientId', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.doctorId);
        const patient = await Patient.findById(req.params.patientId);
        
        if (!doctor || !patient) {
            return res.status(404).json({ message: 'Doctor or Patient not found' });
        }

        if (!doctor.patients.includes(req.params.patientId)) {
            doctor.patients.push(req.params.patientId);
            await doctor.save();
        }

        res.json(doctor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 