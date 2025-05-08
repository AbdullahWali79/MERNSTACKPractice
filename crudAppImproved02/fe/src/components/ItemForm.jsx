/**
 * ItemForm Component
 * 
 * This component creates a form for adding new items to the list.
 * It includes fields for item name and description, with a submit button.
 * 
 * Props:
 * @param {Function} addItem - Function to handle adding new items
 */

import { useState } from "react";

function ItemForm({ addItem }) {
  // State variables to store form input values
  const [name, setName] = useState("");        // Stores the item name
  const [description, setDescription] = useState("");  // Stores the item description

  /**
   * Handles form submission
   * @param {Event} e - The form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevents the default form submission behavior
    addItem({ name, description });  // Calls the addItem function with form data
    setName("");  // Clears the name input
    setDescription("");  // Clears the description input
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Main form container with styling */}
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
        {/* Input fields container */}
        <div>
          {/* Name input field */}
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
              transition: "border-color 0.3s",
              width: "100%",
              boxSizing: "border-box"
            }}
            required  // Makes the name field mandatory
          />

          {/* Description textarea field */}
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
              resize: "vertical",  // Allows vertical resizing only
              minHeight: "80px",
              transition: "border-color 0.3s",
              width: "100%",
              boxSizing: "border-box"
            }}
          />
        </div>

        {/* Submit button container */}
        <div>
          <button
            type="submit"
            style={{
              padding: "12px 14px",
              backgroundColor: "#4158D0",  // Blue color matching the theme
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              width: "100%"
            }}
            // Hover effects for the button
            onMouseOver={(e) => e.target.style.backgroundColor = "#3647b3"}  // Darker blue on hover
            onMouseOut={(e) => e.target.style.backgroundColor = "#4158D0"}   // Original blue when not hovering
          >
            Add Item
          </button>
        </div>
      </div>
    </form>
  );
}

export default ItemForm;
