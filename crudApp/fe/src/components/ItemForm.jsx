import { useState } from "react";
function ItemForm({ addItem }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addItem({ name, description });
    setName("");
    setDescription("");
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
        <div>
          <input
            placeholder="Item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: "12px 14px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "15px",
              fontSize: "16px",
              outline: "none",
              transition: "border-color 0.3s"
            }}
            required
          />
          <textarea
            placeholder="Item description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              padding: "12px 14px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "15px",
              fontSize: "16px",
              outline: "none",
              resize: "vertical",
              minHeight: "80px",
              transition: "border-color 0.3s"
            }}
          />
        </div>
        <div>
          <button
            type="submit"
            style={{
              padding: "12px 14px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "background-color 0.3s"
            }}
          >
            Add Item
          </button>
        </div>
      </div>
    </form>
  );
}
export default ItemForm;
