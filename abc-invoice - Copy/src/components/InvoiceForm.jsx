import React, { useState, useEffect, useRef } from 'react';
import ProductRow from './ProductRow';
import InvoiceFooter from './InvoiceFooter';
import SettingsModal from './SettingsModal';
import AllInvoices from './AllInvoices';
import defaultLogo from '../assets/react.svg';

const defaultSettings = {
  distributor: '',
  town: '',
  transporter: '',
  ref: '',
  logo: '',
  invoiceNumberStart: '',
  invoiceNumberEnd: '',
  biltyNumberStart: '',
  biltyNumberEnd: '',
  refNumberStart: '',
  refNumberEnd: '',
  defaultInvoiceDate: '',
};

const defaultProduct = {
  productName: '',
  packing: 'DOZEN',
  quantity: 1,
  rate: 0,
  scheme: 0,
  schemeValue: 0,
  total: 0,
};

const InvoiceForm = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [allInvoicesOpen, setAllInvoicesOpen] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);
  const [fields, setFields] = useState(defaultSettings);
  const [products, setProducts] = useState([{ ...defaultProduct }]);
  const [saveMsg, setSaveMsg] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [biltyNumber, setBiltyNumber] = useState('');
  const [refNumber, setRefNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [freight, setFreight] = useState(0);
  const [preBalance, setPreBalance] = useState(0);
  const [invoiceTotal, setInvoiceTotal] = useState(0);
  const [totalCurrentBalance, setTotalCurrentBalance] = useState(0);
  const [printInvoice, setPrintInvoice] = useState(null); // for printing from AllInvoices
  const printRef = useRef();

  useEffect(() => {
    const saved = localStorage.getItem('invoiceSettings');
    if (saved) {
      const s = JSON.parse(saved);
      setSettings(s);
      setFields(s);
      setInvoiceNumber(s.invoiceNumberStart || '');
      setBiltyNumber(s.biltyNumberStart || '');
      setRefNumber(s.refNumberStart || '');
      setInvoiceDate(s.defaultInvoiceDate || new Date().toISOString().slice(0, 10));
    }
  }, []);

  // Auto-calculate total for each product
  useEffect(() => {
    setProducts((prev) =>
      prev.map((prod) => {
        const quantity = Number(prod.quantity) || 0;
        const rate = Number(prod.rate) || 0;
        const schemeValue = Number(prod.schemeValue) || 0;
        const total = quantity * rate - schemeValue;
        return { ...prod, total };
      })
    );
  }, [products.length, products.map(p => p.quantity + p.rate + p.schemeValue).join(",")]);

  // Totals
  const totalQuantity = products.reduce((sum, p) => sum + Number(p.quantity || 0), 0);
  const totalAmount = products.reduce((sum, p) => sum + Number(p.total || 0), 0);

  // Auto-calculate Invoice Total and Total Current Balance
  useEffect(() => {
    const invTotal = totalAmount - Number(freight || 0);
    setInvoiceTotal(invTotal);
    setTotalCurrentBalance(Number(preBalance || 0) + invTotal);
  }, [totalAmount, freight, preBalance]);

  const handleFieldChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleProductChange = (index, updated) => {
    setProducts(products.map((p, i) => (i === index ? updated : p)));
  };

  const handleAddProduct = () => {
    setProducts([...products, { ...defaultProduct }]);
  };

  const handleRemoveProduct = (index) => {
    if (products.length === 1) return;
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleSettingsSave = (newSettings) => {
    setSettings(newSettings);
    setFields(newSettings);
    setInvoiceNumber(newSettings.invoiceNumberStart || '');
    setBiltyNumber(newSettings.biltyNumberStart || '');
    setRefNumber(newSettings.refNumberStart || '');
    setInvoiceDate(newSettings.defaultInvoiceDate || new Date().toISOString().slice(0, 10));
  };

  const handleSaveInvoice = () => {
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const invoiceData = {
      ...fields,
      products,
      invoiceNumber,
      biltyNumber,
      refNumber,
      invoiceDate,
      freight,
      preBalance,
      invoiceTotal,
      totalCurrentBalance,
      date: new Date().toISOString(),
      id: Date.now(),
    };
    invoices.push(invoiceData);
    localStorage.setItem('invoices', JSON.stringify(invoices));
    setSaveMsg('Invoice saved!');
    setTimeout(() => setSaveMsg(''), 2000);
  };

  // Print handler
  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  // AllInvoices logic
  const handleEditInvoice = (inv) => {
    setInvoiceNumber(inv.invoiceNumber || '');
    setBiltyNumber(inv.biltyNumber || '');
    setRefNumber(inv.refNumber || '');
    setInvoiceDate(inv.invoiceDate || '');
    setFields({
      distributor: inv.distributor || '',
      town: inv.town || '',
      transporter: inv.transporter || '',
      ref: inv.ref || '',
    });
    setProducts(inv.products || [{ ...defaultProduct }]);
    setFreight(inv.freight || 0);
    setPreBalance(inv.preBalance || 0);
    setInvoiceTotal(inv.invoiceTotal || 0);
    setTotalCurrentBalance(inv.totalCurrentBalance || 0);
    setAllInvoicesOpen(false);
    setPreviewOpen(false);
  };

  const handlePrintInvoice = (inv) => {
    setPrintInvoice(inv);
    setPreviewOpen(true);
    setAllInvoicesOpen(false);
  };

  // Use uploaded logo if available, else default
  const logo = settings.logo ? settings.logo : defaultLogo;

  // For preview: use printInvoice if set, else current form state
  const previewData = printInvoice || {
    invoiceNumber,
    biltyNumber,
    refNumber,
    invoiceDate,
    distributor: fields.distributor,
    town: fields.town,
    transporter: fields.transporter,
    products,
    freight,
    preBalance,
    invoiceTotal,
    totalCurrentBalance,
    logo,
  };

  // Totals for preview
  const previewTotalQuantity = (previewData.products || []).reduce((sum, p) => sum + Number(p.quantity || 0), 0);
  const previewTotalAmount = (previewData.products || []).reduce((sum, p) => sum + Number(p.total || 0), 0);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} onSave={handleSettingsSave} />
      <AllInvoices
        open={allInvoicesOpen}
        onClose={() => setAllInvoicesOpen(false)}
        onEdit={handleEditInvoice}
        onPrint={handlePrintInvoice}
      />
      {previewOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div style={{ background: '#fff', padding: 40, borderRadius: 12, minWidth: 1100, maxHeight: '90vh', overflow: 'auto' }}>
            <div ref={printRef} className="print-area">
              {/* Professional Invoice Preview */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                  <img src={previewData.logo || logo} alt="Company Logo" style={{ height: 60 }} />
                  <div style={{ fontWeight: 'bold', fontSize: 18, marginTop: 8 }}>Hammad Ashraf Foods</div>
                </div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <h2 style={{ margin: 0 }}>Finish Invoice</h2>
                </div>
                <div style={{ minWidth: 260, textAlign: 'right' }}>
                  <div>Invoice No: <b>{previewData.invoiceNumber}</b></div>
                  <div>Invoice Date: <b>{previewData.invoiceDate}</b></div>
                  <div>Bilty No: <b>{previewData.biltyNumber}</b></div>
                  <div>Transporter: <b>{previewData.transporter}</b></div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>Distributor: <b>{previewData.distributor}</b></div>
                <div>Town: <b>{previewData.town}</b></div>
                <div>REF: <b>{previewData.refNumber}</b></div>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }} border="1">
                <thead>
                  <tr style={{ background: '#f0f0f0' }}>
                    <th>Sr No</th>
                    <th>Product Name</th>
                    <th>Packing</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Scheme</th>
                    <th>Scheme Value</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {(previewData.products || []).map((p, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{p.productName}</td>
                      <td>{p.packing}</td>
                      <td>{p.quantity}</td>
                      <td>{p.rate}</td>
                      <td>{p.scheme}</td>
                      <td>{p.schemeValue}</td>
                      <td>{p.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Summary/Report Section */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: 8 }}>
                <div>Total Quantity: {previewTotalQuantity}</div>
                <div>Total Amount: {previewTotalAmount.toLocaleString()}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                <table style={{ minWidth: 350, fontWeight: 'bold' }}>
                  <tbody>
                    <tr><td>Freight:</td><td style={{ textAlign: 'right' }}>{Number(previewData.freight).toLocaleString()}</td></tr>
                    <tr><td>Invoice Total:</td><td style={{ textAlign: 'right' }}>{Number(previewData.invoiceTotal).toLocaleString()}</td></tr>
                    <tr><td>Pre Balance:</td><td style={{ textAlign: 'right' }}>{Number(previewData.preBalance).toLocaleString()}</td></tr>
                    <tr><td>Total Current Balance:</td><td style={{ textAlign: 'right' }}>{Number(previewData.totalCurrentBalance).toLocaleString()}</td></tr>
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 32 }}>
                <div>Date Of Cheque: ____________________</div>
                <div style={{ marginTop: 24 }}>Signature of Accountant: ____________________</div>
              </div>
            </div>
            <div style={{ textAlign: 'right', marginTop: 32 }}>
              <button onClick={handlePrint} style={{ marginRight: 12 }}>Print</button>
              <button onClick={() => { setPreviewOpen(false); setPrintInvoice(null); }}>Close Preview</button>
            </div>
          </div>
        </div>
      )}
      <div style={{ background: '#fff', padding: 40, borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.1)', minWidth: 1100 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <img src={logo} alt="Company Logo" style={{ height: 60 }} />
            <div style={{ fontWeight: 'bold', fontSize: 18, marginTop: 8 }}>Hammad Ashraf Foods</div>
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <h2 style={{ margin: 0 }}>Finish Invoice</h2>
          </div>
          <div style={{ minWidth: 260, textAlign: 'right' }}>
            <button onClick={() => setSettingsOpen(true)} style={{ marginBottom: 8 }}>Settings</button>
            <button onClick={() => setAllInvoicesOpen(true)} style={{ marginBottom: 8, marginLeft: 8 }}>All Invoices</button>
            <div>Invoice No: <input name="invoiceNumber" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} style={{ width: 100 }} /></div>
            <div>Invoice Date: <input name="invoiceDate" type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} style={{ width: 130 }} /></div>
            <div>Bilty No: <input name="biltyNumber" value={biltyNumber} onChange={e => setBiltyNumber(e.target.value)} style={{ width: 100 }} /></div>
            <div>Transporter: <input name="transporter" value={fields.transporter} onChange={handleFieldChange} style={{ width: 120 }} /></div>
          </div>
        </div>
        {/* Distributor Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>Distributor: <input name="distributor" value={fields.distributor} onChange={handleFieldChange} style={{ width: 140 }} /></div>
          <div>Town: <input name="town" value={fields.town} onChange={handleFieldChange} style={{ width: 100 }} /></div>
          <div>REF: <input name="refNumber" value={refNumber} onChange={e => setRefNumber(e.target.value)} style={{ width: 120 }} /></div>
        </div>
        {/* Product Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }} border="1">
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th>Sr No</th>
              <th>Product Name</th>
              <th>Packing</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Scheme</th>
              <th>Scheme Value</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, idx) => (
              <ProductRow
                key={idx}
                index={idx}
                value={prod}
                onChange={handleProductChange}
                onRemove={handleRemoveProduct}
              />
            ))}
          </tbody>
        </table>
        <button type="button" onClick={handleAddProduct} style={{ marginBottom: 16 }}>Add Product</button>
        {/* Footer Summary */}
        <InvoiceFooter totalQuantity={totalQuantity} totalAmount={totalAmount} />
        {/* Summary/Report Section */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
          <table style={{ minWidth: 350, fontWeight: 'bold' }}>
            <tbody>
              <tr>
                <td>Freight:</td>
                <td><input type="number" value={freight} onChange={e => setFreight(e.target.value)} style={{ width: 120, textAlign: 'right' }} /></td>
              </tr>
              <tr>
                <td>Invoice Total:</td>
                <td><input type="number" value={invoiceTotal} onChange={e => setInvoiceTotal(Number(e.target.value))} style={{ width: 120, textAlign: 'right' }} /></td>
              </tr>
              <tr>
                <td>Pre Balance:</td>
                <td><input type="number" value={preBalance} onChange={e => setPreBalance(e.target.value)} style={{ width: 120, textAlign: 'right' }} /></td>
              </tr>
              <tr>
                <td>Total Current Balance:</td>
                <td><input type="number" value={totalCurrentBalance} onChange={e => setTotalCurrentBalance(Number(e.target.value))} style={{ width: 120, textAlign: 'right' }} /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ textAlign: 'right', marginTop: 24 }}>
          <button onClick={handleSaveInvoice} style={{ padding: '10px 24px', fontSize: 16 }}>Save Invoice</button>
          <button onClick={() => setPreviewOpen(true)} style={{ padding: '10px 24px', fontSize: 16, marginLeft: 12 }}>Preview Invoice</button>
          {saveMsg && <span style={{ color: 'green', marginLeft: 16 }}>{saveMsg}</span>}
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm; 