import React, { useState, useEffect } from 'react';

const PatientList = ({ onSelectPatient }) => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    address: '',
    medical_history: ''
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await window.database.getPatients();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      try {
        const data = await window.database.searchPatients(query);
        setPatients(data);
      } catch (error) {
        console.error('Error searching patients:', error);
      }
    } else {
      fetchPatients();
    }
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      await window.database.addPatient(newPatient);
      setShowAddForm(false);
      setNewPatient({
        name: '',
        age: '',
        gender: '',
        contact: '',
        address: '',
        medical_history: ''
      });
      fetchPatients();
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    onSelectPatient(patient);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Patients</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Patient
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search patients..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border rounded"
        />
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add New Patient</h3>
            <form onSubmit={handleAddPatient}>
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Age</label>
                <input
                  type="number"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Gender</label>
                <select
                  value={newPatient.gender}
                  onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Contact</label>
                <input
                  type="text"
                  value={newPatient.contact}
                  onChange={(e) => setNewPatient({...newPatient, contact: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Address</label>
                <textarea
                  value={newPatient.address}
                  onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Medical History</label>
                <textarea
                  value={newPatient.medical_history}
                  onChange={(e) => setNewPatient({...newPatient, medical_history: e.target.value})}
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
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg"
            onClick={() => handlePatientClick(patient)}
          >
            <h3 className="text-lg font-semibold">{patient.name}</h3>
            <p>Age: {patient.age}</p>
            <p>Gender: {patient.gender}</p>
            <p>Contact: {patient.contact}</p>
          </div>
        ))}
      </div>

      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{selectedPatient.name}'s Details</h3>
              <button
                onClick={() => setSelectedPatient(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><strong>Age:</strong> {selectedPatient.age}</p>
                <p><strong>Gender:</strong> {selectedPatient.gender}</p>
                <p><strong>Contact:</strong> {selectedPatient.contact}</p>
                <p><strong>Address:</strong> {selectedPatient.address}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Medical History</h4>
                <p>{selectedPatient.medical_history}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientList; 