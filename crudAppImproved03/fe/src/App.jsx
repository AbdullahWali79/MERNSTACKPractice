import React, { useState } from 'react';
import PatientList from './components/PatientList';
import PatientVisit from './components/PatientVisit';

function App() {
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Doctor's Office Management System</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <PatientList onSelectPatient={(patient) => setSelectedPatientId(patient.id)} />
          </div>
          <div>
            {selectedPatientId ? (
              <PatientVisit patientId={selectedPatientId} />
            ) : (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <p className="text-gray-500">Select a patient to view their visit history</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
