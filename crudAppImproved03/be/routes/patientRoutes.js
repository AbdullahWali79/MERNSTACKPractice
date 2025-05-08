const express = require('express');
const router = express.Router();
const db = require('../database/sqlite');

// Get all patients
router.get('/', (req, res) => {
    db.all('SELECT * FROM patients ORDER BY name', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Get single patient with visit history
router.get('/:id', (req, res) => {
    const patientId = req.params.id;
    
    db.get('SELECT * FROM patients WHERE id = ?', [patientId], (err, patient) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        if (!patient) {
            res.status(404).json({ message: 'Patient not found' });
            return;
        }
        
        // Get patient's visit history
        db.all(`
            SELECT v.*, d.name as doctor_name 
            FROM visits v 
            LEFT JOIN doctors d ON v.doctor_id = d.id 
            WHERE v.patient_id = ? 
            ORDER BY v.visit_date DESC
        `, [patientId], (err, visits) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            
            res.json({
                ...patient,
                visits
            });
        });
    });
});

// Add new patient
router.post('/', (req, res) => {
    const { name, age, gender, contact, address, medical_history } = req.body;
    const sql = `INSERT INTO patients (name, age, gender, contact, address, medical_history) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.run(sql, [name, age, gender, contact, address, medical_history], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            id: this.lastID,
            name,
            age,
            gender,
            contact,
            address,
            medical_history
        });
    });
});

// Update patient
router.put('/:id', (req, res) => {
    const { name, age, gender, contact, address, medical_history } = req.body;
    const sql = `UPDATE patients 
                 SET name = ?, age = ?, gender = ?, contact = ?, address = ?, medical_history = ?
                 WHERE id = ?`;
    
    db.run(sql, [name, age, gender, contact, address, medical_history, req.params.id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Patient updated successfully' });
    });
});

// Add visit record
router.post('/:id/visits', (req, res) => {
    const { doctor_id, symptoms, diagnosis, prescription, notes, next_visit_date } = req.body;
    const sql = `INSERT INTO visits (patient_id, doctor_id, symptoms, diagnosis, prescription, notes, next_visit_date) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(sql, [req.params.id, doctor_id, symptoms, diagnosis, prescription, notes, next_visit_date], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            id: this.lastID,
            patient_id: req.params.id,
            doctor_id,
            symptoms,
            diagnosis,
            prescription,
            notes,
            next_visit_date
        });
    });
});

// Search patients
router.get('/search/:query', (req, res) => {
    const query = `%${req.params.query}%`;
    const sql = `SELECT * FROM patients 
                 WHERE name LIKE ? OR contact LIKE ? OR address LIKE ?
                 ORDER BY name`;
    
    db.all(sql, [query, query, query], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

module.exports = router; 