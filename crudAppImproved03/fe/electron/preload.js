const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Initialize database connection
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Create tables if they don't exist
db.serialize(() => {
  // Patients table
  db.run(`CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER,
    gender TEXT,
    contact TEXT,
    address TEXT,
    medical_history TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Visits table
  db.run(`CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER,
    date TEXT NOT NULL,
    symptoms TEXT,
    diagnosis TEXT,
    prescription TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients (id)
  )`);
});

// Expose database functions to renderer process
contextBridge.exposeInMainWorld('database', {
  // Patient operations
  getPatients: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM patients ORDER BY created_at DESC', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  searchPatients: (query) => {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM patients WHERE name LIKE ? OR contact LIKE ? ORDER BY created_at DESC',
        [`%${query}%`, `%${query}%`],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  addPatient: (patient) => {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO patients (name, age, gender, contact, address, medical_history) VALUES (?, ?, ?, ?, ?, ?)',
        [patient.name, patient.age, patient.gender, patient.contact, patient.address, patient.medical_history],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...patient });
        }
      );
    });
  },

  // Visit operations
  getVisits: (patientId) => {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM visits WHERE patient_id = ? ORDER BY date DESC',
        [patientId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  addVisit: (visit) => {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO visits (patient_id, date, symptoms, diagnosis, prescription, notes) VALUES (?, ?, ?, ?, ?, ?)',
        [visit.patientId, visit.date, visit.symptoms, visit.diagnosis, visit.prescription, visit.notes],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...visit });
        }
      );
    });
  }
}); 