const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Get the user's home directory
const homeDir = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share");

// Create app directory if it doesn't exist
const appDir = path.join(homeDir, 'DoctorApp');
if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir, { recursive: true });
}

// Database file path
const dbPath = path.join(appDir, 'doctors.db');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        // Create tables if they don't exist
        db.serialize(() => {
            // Doctors table
            db.run(`
                CREATE TABLE IF NOT EXISTS doctors (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    specialization TEXT,
                    contact TEXT,
                    email TEXT,
                    address TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Patients table
            db.run(`
                CREATE TABLE IF NOT EXISTS patients (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    age INTEGER,
                    gender TEXT,
                    contact TEXT,
                    address TEXT,
                    medical_history TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Visits table (Patient History)
            db.run(`
                CREATE TABLE IF NOT EXISTS visits (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    patient_id INTEGER,
                    doctor_id INTEGER,
                    visit_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                    symptoms TEXT,
                    diagnosis TEXT,
                    prescription TEXT,
                    notes TEXT,
                    next_visit_date TEXT,
                    FOREIGN KEY (patient_id) REFERENCES patients (id),
                    FOREIGN KEY (doctor_id) REFERENCES doctors (id)
                )
            `);
        });
    }
});

module.exports = db; 