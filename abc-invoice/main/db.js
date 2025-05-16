const path = require('path');
const { app } = require('electron');
const Database = require('better-sqlite3');
const dbPath = path.join(app.getPath('userData'), 'abc-invoice.db');
const db = new Database(dbPath);

// Create table if not exists
// We'll store all invoice data as JSON in the 'data' column
// You can expand this schema as needed

db.prepare(`
  CREATE TABLE IF NOT EXISTS invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT
  )
`).run();

module.exports = {
  getAllInvoices: () => {
    return db.prepare('SELECT id, data FROM invoices').all().map(row => ({
      id: row.id,
      ...JSON.parse(row.data)
    }));
  },
  addInvoice: (invoice) => {
    const info = db.prepare('INSERT INTO invoices (data) VALUES (?)').run(JSON.stringify(invoice));
    return { id: info.lastInsertRowid, ...invoice };
  },
  updateInvoice: (invoice) => {
    db.prepare('UPDATE invoices SET data = ? WHERE id = ?').run(JSON.stringify(invoice), invoice.id);
    return invoice;
  },
  deleteInvoice: (id) => {
    db.prepare('DELETE FROM invoices WHERE id = ?').run(id);
    return id;
  }
}; 