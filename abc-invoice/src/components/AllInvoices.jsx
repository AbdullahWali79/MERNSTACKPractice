import React, { useEffect, useState } from 'react';

const AllInvoices = ({ open, onClose, onEdit, onPrint }) => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    if (open) {
      window.api.listInvoices().then(setInvoices);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
      <div style={{ background: '#fff', padding: 32, borderRadius: 10, minWidth: 900, maxHeight: '90vh', overflowY: 'auto' }}>
        <h3>All Invoices</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }} border="1">
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th>Invoice No</th>
              <th>Date</th>
              <th>Distributor</th>
              <th>Town</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center' }}>No invoices found.</td></tr>
            )}
            {invoices.map((inv, idx) => (
              <tr key={inv.id || idx}>
                <td>{inv.invoiceNumber}</td>
                <td>{inv.invoiceDate}</td>
                <td>{inv.distributor}</td>
                <td>{inv.town}</td>
                <td>
                  <button onClick={() => onEdit(inv)}>Edit</button>
                  <button onClick={() => onPrint(inv)} style={{ marginLeft: 8 }}>Print</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: 'right', marginTop: 20 }}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AllInvoices; 