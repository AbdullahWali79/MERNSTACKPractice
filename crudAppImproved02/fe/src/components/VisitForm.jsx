import { useState } from "react";

function VisitForm({ addVisit, patientId }) {
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addVisit({ 
      patientId, 
      diagnosis, 
      prescription,
      symptoms,
      notes,
      visitDate: new Date()
    });
    setDiagnosis("");
    setPrescription("");
    setSymptoms("");
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          border: "1px solid #e0e0e0",
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          width: "100%",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}
      >
        <h2 style={{ 
          marginBottom: "20px", 
          color: "#1a73e8",
          fontSize: "1.8rem"
        }}>New Visit Record</h2>
        
        <div style={{ 
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px"
        }}>
          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "10px", 
              color: "#333", 
              fontWeight: "500",
              fontSize: "1.1rem"
            }}>
              Symptoms & Complaints *
            </label>
            <textarea
              placeholder="Enter patient's symptoms and complaints"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              style={{
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
                resize: "vertical",
                minHeight: "150px",
                width: "100%",
                boxSizing: "border-box",
                fontFamily: "Arial, sans-serif",
                lineHeight: "1.5"
              }}
              required
            />
          </div>

          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "10px", 
              color: "#333", 
              fontWeight: "500",
              fontSize: "1.1rem"
            }}>
              Diagnosis *
            </label>
            <textarea
              placeholder="Enter medical diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              style={{
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
                resize: "vertical",
                minHeight: "150px",
                width: "100%",
                boxSizing: "border-box",
                fontFamily: "Arial, sans-serif",
                lineHeight: "1.5"
              }}
              required
            />
          </div>

          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "10px", 
              color: "#333", 
              fontWeight: "500",
              fontSize: "1.1rem"
            }}>
              Prescription *
            </label>
            <textarea
              placeholder="Enter prescribed medications and instructions"
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              style={{
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
                resize: "vertical",
                minHeight: "150px",
                width: "100%",
                boxSizing: "border-box",
                fontFamily: "Arial, sans-serif",
                lineHeight: "1.5"
              }}
              required
            />
          </div>

          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "10px", 
              color: "#333", 
              fontWeight: "500",
              fontSize: "1.1rem"
            }}>
              Additional Notes
            </label>
            <textarea
              placeholder="Enter any additional notes or recommendations"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
                resize: "vertical",
                minHeight: "150px",
                width: "100%",
                boxSizing: "border-box",
                fontFamily: "Arial, sans-serif",
                lineHeight: "1.5"
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          style={{
            padding: "15px 20px",
            backgroundColor: "#1a73e8",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
            marginTop: "30px",
            width: "100%"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#1557b0"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#1a73e8"}
        >
          Save Visit Record
        </button>
      </div>
    </form>
  );
}

export default VisitForm; 