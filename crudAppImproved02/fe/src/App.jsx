import { useState, useEffect } from "react";
import axios from "axios";
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";
import VisitForm from "./components/VisitForm";
import VisitHistory from "./components/VisitHistory";

function App() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [visits, setVisits] = useState([]);
  const [activeTab, setActiveTab] = useState("patients");

  // Fetch all patients
  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/patients");
      setPatients(res.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Fetch visits for selected patient
  const fetchVisits = async (patientId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/visits/patient/${patientId}`);
      setVisits(res.data);
    } catch (error) {
      console.error("Error fetching visits:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    if (selectedPatient) {
      fetchVisits(selectedPatient._id);
    }
  }, [selectedPatient]);

  const addPatient = async (patientData) => {
    try {
      console.log('Adding patient:', patientData);
      const response = await axios.post("http://localhost:5000/api/patients", patientData);
      console.log('Patient added successfully:', response.data);
      fetchPatients();
    } catch (error) {
      console.error("Error adding patient:", error.response?.data || error.message);
    }
  };

  const addVisit = async (visitData) => {
    try {
      console.log('Adding visit:', visitData);
      const response = await axios.post("http://localhost:5000/api/visits", visitData);
      console.log('Visit added successfully:', response.data);
      fetchVisits(selectedPatient._id);
    } catch (error) {
      console.error("Error adding visit:", error.response?.data || error.message);
    }
  };

  return (
    <div style={{ 
      padding: "20px", 
      backgroundColor: "#f5f5f7",
      minHeight: "100vh",
      width: "100vw",
      boxSizing: "border-box"
    }}>
      <header style={{
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        marginBottom: "20px",
        width: "100%"
      }}>
        <h1 style={{ 
          margin: 0,
          color: "#1a73e8",
          fontSize: "2.5rem",
          textAlign: "center"
        }}>
          Doctor's Clinic Management System
        </h1>
      </header>

      <div style={{ 
        display: "flex",
        gap: "20px",
        width: "100%",
        margin: "0 auto",
        height: "calc(100vh - 140px)"
      }}>
        {/* Left Side - Patient Form */}
        <div style={{ 
          flex: "0 0 450px",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          overflowY: "auto"
        }}>
          <PatientForm addPatient={addPatient} />
        </div>

        {/* Middle - Patient List */}
        <div style={{ 
          flex: "0 0 500px",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          overflowY: "auto"
        }}>
          <PatientList 
            patients={patients} 
            onSelectPatient={(patient) => {
              setSelectedPatient(patient);
              setActiveTab("visits");
            }} 
          />
        </div>

        {/* Right Side - Visit Form and History */}
        <div style={{ 
          flex: "1",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          minWidth: "600px"
        }}>
          {selectedPatient ? (
            <>
              <div style={{ 
                padding: "20px", 
                backgroundColor: "#f8f9fa", 
                borderRadius: "10px",
                marginBottom: "10px"
              }}>
                <h2 style={{ margin: "0 0 10px 0", color: "#333" }}>
                  Current Patient: {selectedPatient.name}
                </h2>
                <p style={{ margin: "5px 0", color: "#666" }}>
                  Address: {selectedPatient.address}
                </p>
                <p style={{ margin: "5px 0", color: "#666" }}>
                  Phone: {selectedPatient.phoneNumber}
                </p>
                <button
                  onClick={() => setSelectedPatient(null)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#f0f0f0",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "10px"
                  }}
                >
                  Change Patient
                </button>
              </div>

              <VisitForm 
                addVisit={addVisit} 
                patientId={selectedPatient._id} 
              />
              
              <VisitHistory visits={visits} />
            </>
          ) : (
            <div style={{ 
              padding: "20px", 
              textAlign: "center",
              backgroundColor: "#f8f9fa",
              borderRadius: "10px"
            }}>
              <h3 style={{ color: "#666" }}>Please select a patient first</h3>
              <p style={{ color: "#666" }}>
                Select a patient from the list to view and add visit records
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
