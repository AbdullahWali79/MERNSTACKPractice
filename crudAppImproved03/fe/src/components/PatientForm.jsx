import { useState } from "react";

function PatientForm({ addPatient }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addPatient({ name, address, phoneNumber, age, gender });
    setName("");
    setAddress("");
    setPhoneNumber("");
    setAge("");
    setGender("");
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
          maxWidth: "400px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          margin: "20px auto"
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>New Patient Registration</h2>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#666" }}>
            Full Name *
          </label>
          <input
            placeholder="Enter patient's full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: "12px 14px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              transition: "border-color 0.3s",
              width: "100%",
              boxSizing: "border-box"
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#666" }}>
            Age *
          </label>
          <input
            type="number"
            placeholder="Enter patient's age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{
              padding: "12px 14px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              transition: "border-color 0.3s",
              width: "100%",
              boxSizing: "border-box"
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#666" }}>
            Gender *
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={{
              padding: "12px 14px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              transition: "border-color 0.3s",
              width: "100%",
              boxSizing: "border-box",
              backgroundColor: "white"
            }}
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#666" }}>
            Address *
          </label>
          <textarea
            placeholder="Enter patient's complete address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              padding: "12px 14px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              resize: "vertical",
              minHeight: "80px",
              transition: "border-color 0.3s",
              width: "100%",
              boxSizing: "border-box"
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#666" }}>
            Phone Number *
          </label>
          <input
            type="tel"
            placeholder="Enter patient's phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{
              padding: "12px 14px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              transition: "border-color 0.3s",
              width: "100%",
              boxSizing: "border-box"
            }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "12px 14px",
            backgroundColor: "#4158D0",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            width: "100%"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#3647b3"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#4158D0"}
        >
          Register New Patient
        </button>
      </div>
    </form>
  );
}

export default PatientForm; 