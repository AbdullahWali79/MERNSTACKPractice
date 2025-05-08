const express = require('express');
const router = express.Router();
const db = require('../database/sqlite');

// Get all doctors
router.get('/', (req, res) => {
    db.all('SELECT * FROM doctors', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Add new doctor
router.post('/', (req, res) => {
    const { name, specialization, contact, email, address } = req.body;
    const sql = `INSERT INTO doctors (name, specialization, contact, email, address) 
                 VALUES (?, ?, ?, ?, ?)`;
    
    db.run(sql, [name, specialization, contact, email, address], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            id: this.lastID,
            name,
            specialization,
            contact,
            email,
            address
        });
    });
});

// Update doctor
router.put('/:id', (req, res) => {
    const { name, specialization, contact, email, address } = req.body;
    const sql = `UPDATE doctors 
                 SET name = ?, specialization = ?, contact = ?, email = ?, address = ?
                 WHERE id = ?`;
    
    db.run(sql, [name, specialization, contact, email, address, req.params.id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Doctor updated successfully' });
    });
});

// Delete doctor
router.delete('/:id', (req, res) => {
    db.run('DELETE FROM doctors WHERE id = ?', req.params.id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Doctor deleted successfully' });
    });
});

// Export data
router.get('/export-data', (req, res) => {
    db.all('SELECT * FROM doctors', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=doctor-data.json');
        res.json(rows);
    });
});

// Import data
router.post('/import-data', (req, res) => {
    const doctors = req.body;
    
    db.serialize(() => {
        db.run('BEGIN TRANSACTION');
        
        // Clear existing data
        db.run('DELETE FROM doctors', [], (err) => {
            if (err) {
                db.run('ROLLBACK');
                res.status(500).json({ error: err.message });
                return;
            }
            
            // Insert new data
            const stmt = db.prepare('INSERT INTO doctors (name, specialization, contact, email, address) VALUES (?, ?, ?, ?, ?)');
            
            doctors.forEach(doctor => {
                stmt.run(doctor.name, doctor.specialization, doctor.contact, doctor.email, doctor.address);
            });
            
            stmt.finalize();
            
            db.run('COMMIT', (err) => {
                if (err) {
                    db.run('ROLLBACK');
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.json({ message: 'Data imported successfully' });
            });
        });
    });
});

module.exports = router; 