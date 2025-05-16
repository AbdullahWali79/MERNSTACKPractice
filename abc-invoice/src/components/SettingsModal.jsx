import React, { useState, useEffect } from 'react';

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

const SettingsModal = ({ open, onClose, onSave }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [logoPreview, setLogoPreview] = useState('');

  useEffect(() => {
    if (open) {
      const saved = localStorage.getItem('invoiceSettings');
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        setLogoPreview(parsed.logo || '');
      }
    }
  }, [open]);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings((prev) => ({ ...prev, logo: reader.result }));
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('invoiceSettings', JSON.stringify(settings));
    onSave(settings);
    onClose();
  };

  if (!open) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', padding: 32, borderRadius: 10, minWidth: 400, maxHeight: '90vh', overflowY: 'auto' }}>
        <h3>Settings</h3>
        <div style={{ marginBottom: 12 }}>
          <label>Distributor: <input name="distributor" value={settings.distributor} onChange={handleChange} /></label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Town: <input name="town" value={settings.town} onChange={handleChange} /></label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Transporter: <input name="transporter" value={settings.transporter} onChange={handleChange} /></label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Ref: <input name="ref" value={settings.ref} onChange={handleChange} /></label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Invoice Number Start: <input name="invoiceNumberStart" type="number" value={settings.invoiceNumberStart} onChange={handleChange} style={{ width: 90 }} /></label>
          <label style={{ marginLeft: 10 }}>End: <input name="invoiceNumberEnd" type="number" value={settings.invoiceNumberEnd} onChange={handleChange} style={{ width: 90 }} /></label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Bilty Number Start: <input name="biltyNumberStart" type="number" value={settings.biltyNumberStart} onChange={handleChange} style={{ width: 90 }} /></label>
          <label style={{ marginLeft: 10 }}>End: <input name="biltyNumberEnd" type="number" value={settings.biltyNumberEnd} onChange={handleChange} style={{ width: 90 }} /></label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Reference Number Start: <input name="refNumberStart" type="number" value={settings.refNumberStart} onChange={handleChange} style={{ width: 90 }} /></label>
          <label style={{ marginLeft: 10 }}>End: <input name="refNumberEnd" type="number" value={settings.refNumberEnd} onChange={handleChange} style={{ width: 90 }} /></label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Default Invoice Date: <input name="defaultInvoiceDate" type="date" value={settings.defaultInvoiceDate} onChange={handleChange} /></label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Logo: <input type="file" accept="image/*" onChange={handleLogoChange} /></label>
          {logoPreview && (
            <div style={{ marginTop: 8 }}>
              <img src={logoPreview} alt="Logo Preview" style={{ height: 50, border: '1px solid #ccc', borderRadius: 4 }} />
            </div>
          )}
        </div>
        <div style={{ marginTop: 20, textAlign: 'right' }}>
          <button onClick={onClose} style={{ marginRight: 10 }}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal; 