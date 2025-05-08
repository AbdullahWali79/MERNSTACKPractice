import React, { useState } from 'react';
import axios from 'axios';

const DataManagement = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleExport = async () => {
    try {
      const response = await axios.get(`${window.BACKEND_URL}/api/export-data`, {
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'doctor-data.json');
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      setMessage('Data exported successfully!');
    } catch (error) {
      setMessage('Error exporting data: ' + error.message);
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${window.BACKEND_URL}/api/import-data`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Data imported successfully!');
    } catch (error) {
      setMessage('Error importing data: ' + error.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Data Management</h2>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Export Data</h3>
          <p className="mb-2">Download all your data in JSON format</p>
          <button
            onClick={handleExport}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Export Data
          </button>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Import Data</h3>
          <p className="mb-2">Upload a JSON file to import data</p>
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {message && (
          <div className={`p-4 rounded ${
            message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataManagement; 