import { useState } from "react";
import axios from "axios";

function PatientList({ patients, onSelectPatient }) {
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  const handlePatientClick = (patient) => {
    setSelectedPatientId(patient._id);
    setShowOptions(true);
  };

  const handleViewRecord = (patient) => {
    onSelectPatient(patient);
    setShowOptions(false);
  };

  const handlePrintRecord = async (patient) => {
    try {
      // Fetch visits for this patient
      const response = await axios.get(`http://localhost:5000/api/visits/patient/${patient._id}`);
      const visits = response.data;

      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Patient Record - ${patient.name}</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                padding: 20px;
                line-height: 1.6;
              }
              .header { 
                text-align: center; 
                margin-bottom: 30px;
                border-bottom: 2px solid #1a73e8;
                padding-bottom: 20px;
              }
              .section { 
                margin-bottom: 30px;
                padding: 15px;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
              }
              .label { 
                font-weight: bold; 
                color: #1a73e8;
                display: inline-block;
                width: 120px;
              }
              .visit-record {
                margin-top: 20px;
                padding: 15px;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                background-color: #f8f9fa;
              }
              .visit-date {
                font-weight: bold;
                color: #1a73e8;
                margin-bottom: 10px;
              }
              .visit-section {
                margin: 10px 0;
              }
              .visit-section h4 {
                color: #1a73e8;
                margin: 5px 0;
              }
              @media print {
                .no-print { display: none; }
                body { padding: 0; }
                .section { break-inside: avoid; }
                .visit-record { break-inside: avoid; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Patient Medical Record</h1>
              <p>Generated on: ${new Date().toLocaleDateString()}</p>
            </div>

            <div class="section">
              <h2>Patient Information</h2>
              <p><span class="label">Name:</span> ${patient.name}</p>
              <p><span class="label">Age:</span> ${patient.age}</p>
              <p><span class="label">Gender:</span> ${patient.gender}</p>
              <p><span class="label">Address:</span> ${patient.address}</p>
              <p><span class="label">Phone:</span> ${patient.phoneNumber}</p>
            </div>

            <div class="section">
              <h2>Visit History</h2>
              ${visits.length === 0 ? 
                '<p style="text-align: center; color: #666;">No visit records found</p>' :
                visits.map(visit => `
                  <div class="visit-record">
                    <div class="visit-date">
                      Visit Date: ${new Date(visit.visitDate).toLocaleDateString()}
                      <br>
                      Time: ${new Date(visit.visitDate).toLocaleTimeString()}
                    </div>
                    <div class="visit-section">
                      <h4>Symptoms & Complaints</h4>
                      <p>${visit.symptoms}</p>
                    </div>
                    <div class="visit-section">
                      <h4>Diagnosis</h4>
                      <p>${visit.diagnosis}</p>
                    </div>
                    <div class="visit-section">
                      <h4>Prescription</h4>
                      <p>${visit.prescription}</p>
                    </div>
                    ${visit.notes ? `
                      <div class="visit-section">
                        <h4>Additional Notes</h4>
                        <p>${visit.notes}</p>
                      </div>
                    ` : ''}
                  </div>
                `).join('')
              }
            </div>

            <button class="no-print" onclick="window.print()" style="
              padding: 10px 20px;
              background-color: #1a73e8;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 16px;
              margin-top: 20px;
            ">Print Record</button>
          </body>
        </html>
      `);
      printWindow.document.close();
    } catch (error) {
      console.error("Error fetching visits:", error);
      alert("Error loading visit history. Please try again.");
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phoneNumber.includes(searchTerm)
  );

  const displayedPatients = showAll ? filteredPatients : filteredPatients.slice(0, 3);

  return (
    <div style={{ marginTop: "20px" }}>
      <div style={{ 
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2 style={{ 
          margin: 0,
          color: "#1a73e8",
          fontSize: "1.5rem"
        }}>Patient List</h2>

        <div style={{ 
          display: "flex",
          gap: "10px",
          alignItems: "center"
        }}>
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
              width: "200px"
            }}
          />
          {filteredPatients.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                padding: "8px 12px",
                backgroundColor: "#1a73e8",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>
      
      {filteredPatients.length === 0 ? (
        <p style={{ 
          textAlign: "center", 
          color: "#666",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px"
        }}>
          No patients found
        </p>
      ) : (
        <div style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "15px"
        }}>
          {displayedPatients.map((patient) => (
            <div
              key={patient._id}
              style={{
                padding: "15px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                cursor: "pointer",
                position: "relative"
              }}
              onClick={() => handlePatientClick(patient)}
            >
              <h3 style={{ 
                margin: "0 0 10px 0",
                color: "#333"
              }}>{patient.name}</h3>
              
              <p style={{ 
                margin: "5px 0",
                color: "#666"
              }}>
                <strong>Age:</strong> {patient.age}
              </p>
              
              <p style={{ 
                margin: "5px 0",
                color: "#666"
              }}>
                <strong>Gender:</strong> {patient.gender}
              </p>
              
              <p style={{ 
                margin: "5px 0",
                color: "#666"
              }}>
                <strong>Phone:</strong> {patient.phoneNumber}
              </p>

              {showOptions && selectedPatientId === patient._id && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  right: "0",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  padding: "10px",
                  marginTop: "5px",
                  zIndex: 1000
                }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewRecord(patient);
                    }}
                    style={{
                      width: "100%",
                      padding: "8px",
                      marginBottom: "5px",
                      backgroundColor: "#1a73e8",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    View Medical Records
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrintRecord(patient);
                    }}
                    style={{
                      width: "100%",
                      padding: "8px",
                      backgroundColor: "#34a853",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Print Patient Record
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientList; 