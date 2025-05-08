import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientVisit = ({ patientId }) => {
  const [visits, setVisits] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVisit, setNewVisit] = useState({
    date: new Date().toISOString().split('T')[0],
    symptoms: '',
    diagnosis: '',
    prescription: '',
    notes: ''
  });

  useEffect(() => {
    if (patientId) {
      fetchVisits();
    }
  }, [patientId]);

  const fetchVisits = async () => {
    try {
      const response = await axios.get(`${window.BACKEND_URL}/api/visits/patient/${patientId}`);
      setVisits(response.data);
    } catch (error) {
      console.error('Error fetching visits:', error);
    }
  };

  const handleAddVisit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${window.BACKEND_URL}/api/visits`, {
        ...newVisit,
        patientId
      });
      setShowAddForm(false);
      setNewVisit({
        date: new Date().toISOString().split('T')[0],
        symptoms: '',
        diagnosis: '',
        prescription: '',
        notes: ''
      });
      fetchVisits();
    } catch (error) {
      console.error('Error adding visit:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Visit History</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Visit
        </button>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add New Visit</h3>
            <form onSubmit={handleAddVisit}>
              <div className="mb-4">
                <label className="block mb-2">Date</label>
                <input
                  type="date"
                  value={newVisit.date}
                  onChange={(e) => setNewVisit({...newVisit, date: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Symptoms</label>
                <textarea
                  value={newVisit.symptoms}
                  onChange={(e) => setNewVisit({...newVisit, symptoms: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Diagnosis</label>
                <textarea
                  value={newVisit.diagnosis}
                  onChange={(e) => setNewVisit({...newVisit, diagnosis: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Prescription</label>
                <textarea
                  value={newVisit.prescription}
                  onChange={(e) => setNewVisit({...newVisit, prescription: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Notes</label>
                <textarea
                  value={newVisit.notes}
                  onChange={(e) => setNewVisit({...newVisit, notes: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Visit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {visits.map((visit) => (
          <div key={visit.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">
                Visit Date: {new Date(visit.date).toLocaleDateString()}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-1">Symptoms</h4>
                <p>{visit.symptoms}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Diagnosis</h4>
                <p>{visit.diagnosis}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Prescription</h4>
                <p>{visit.prescription}</p>
              </div>
              {visit.notes && (
                <div>
                  <h4 className="font-semibold mb-1">Notes</h4>
                  <p>{visit.notes}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientVisit; 