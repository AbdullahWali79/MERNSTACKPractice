import React from 'react';

const InvoiceFooter = ({ totalQuantity = 0, totalAmount = 0 }) => {
  // Footer summary with dynamic totals
  return (
    <div style={{ marginTop: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span>Total Quantity: </span>
        <span>{totalQuantity}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span>Total Amount: </span>
        <span>{totalAmount.toLocaleString()}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span>Scheme Value: </span>
        <span>0.00</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span>Invoice Total: </span>
        <span>0.00</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span>Pre Balance: </span>
        <span>0.00</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span>Total Current Balance: </span>
        <span>0.00</span>
      </div>
      <div style={{ marginTop: 16 }}>
        <label>Date Of Cheque: <input type="date" /></label>
      </div>
    </div>
  );
};

export default InvoiceFooter; 