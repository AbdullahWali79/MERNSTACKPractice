function VisitHistory({ visits }) {
  const handlePrintVisit = (visit) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Visit Record - ${new Date(visit.visitDate).toLocaleDateString()}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .section { margin-bottom: 20px; }
            .label { font-weight: bold; color: #1a73e8; }
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Medical Visit Record</h1>
            <p>Date: ${new Date(visit.visitDate).toLocaleDateString()}</p>
            <p>Time: ${new Date(visit.visitDate).toLocaleTimeString()}</p>
          </div>
          <div class="section">
            <h2>Symptoms & Complaints</h2>
            <p>${visit.symptoms}</p>
          </div>
          <div class="section">
            <h2>Diagnosis</h2>
            <p>${visit.diagnosis}</p>
          </div>
          <div class="section">
            <h2>Prescription</h2>
            <p>${visit.prescription}</p>
          </div>
          ${visit.notes ? `
            <div class="section">
              <h2>Additional Notes</h2>
              <p>${visit.notes}</p>
            </div>
          ` : ''}
          <button class="no-print" onclick="window.print()">Print Record</button>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div style={{ 
      padding: "20px",
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ 
        marginBottom: "20px", 
        color: "#1a73e8",
        fontSize: "1.5rem"
      }}>Visit History</h2>
      
      {visits.length === 0 ? (
        <p style={{ 
          textAlign: "center", 
          color: "#666",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px"
        }}>
          No visit records found
        </p>
      ) : (
        <div style={{ 
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}>
          {visits.map((visit) => (
            <div
              key={visit._id}
              style={{
                padding: "20px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                border: "1px solid #e0e0e0"
              }}
            >
              <div style={{ 
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                paddingBottom: "10px",
                borderBottom: "1px solid #e0e0e0"
              }}>
                <div>
                  <h3 style={{ 
                    margin: 0,
                    color: "#333",
                    fontSize: "1.1rem"
                  }}>
                    Visit Date: {new Date(visit.visitDate).toLocaleDateString()}
                  </h3>
                  <span style={{ 
                    color: "#666",
                    fontSize: "0.9rem"
                  }}>
                    {new Date(visit.visitDate).toLocaleTimeString()}
                  </span>
                </div>
                <button
                  onClick={() => handlePrintVisit(visit)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#34a853",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                >
                  Print Record
                </button>
              </div>

              <div style={{ 
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px"
              }}>
                <div>
                  <h4 style={{ 
                    margin: "0 0 5px 0",
                    color: "#1a73e8",
                    fontSize: "1rem"
                  }}>Symptoms & Complaints</h4>
                  <p style={{ 
                    margin: 0,
                    color: "#333",
                    lineHeight: "1.5"
                  }}>{visit.symptoms}</p>
                </div>

                <div>
                  <h4 style={{ 
                    margin: "0 0 5px 0",
                    color: "#1a73e8",
                    fontSize: "1rem"
                  }}>Diagnosis</h4>
                  <p style={{ 
                    margin: 0,
                    color: "#333",
                    lineHeight: "1.5"
                  }}>{visit.diagnosis}</p>
                </div>

                <div>
                  <h4 style={{ 
                    margin: "0 0 5px 0",
                    color: "#1a73e8",
                    fontSize: "1rem"
                  }}>Prescription</h4>
                  <p style={{ 
                    margin: 0,
                    color: "#333",
                    lineHeight: "1.5"
                  }}>{visit.prescription}</p>
                </div>

                {visit.notes && (
                  <div>
                    <h4 style={{ 
                      margin: "0 0 5px 0",
                      color: "#1a73e8",
                      fontSize: "1rem"
                    }}>Additional Notes</h4>
                    <p style={{ 
                      margin: 0,
                      color: "#333",
                      lineHeight: "1.5"
                    }}>{visit.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VisitHistory; 