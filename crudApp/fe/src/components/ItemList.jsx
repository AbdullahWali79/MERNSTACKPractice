function ItemList({ items, updateItem, deleteItem }) {
  const handleUpdate = (item) => {
    const newName = prompt("Enter new name", item.name);
    if (newName) {
      updateItem(item._id, { ...item, name: newName });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap", // allow wrapping
        justifyContent: "space-between", // spacing between items
        backgroundColor: "#f0f4f8", // lighter background for visual appeal
        padding: "20px",
        gap: "20px" // space between items
      }}
    >
      {items.map((item) => (
        <div
          key={item._id}
          style={{
            flex: "1 1 calc(25% - 20px)", // 4 items in a row, minus gap
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            color: "#333",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            minWidth: "200px" // helps with wrapping on smaller screens
          }}
        >
          <strong>{item.name}</strong>
          <br /> <em>{item.description}</em>
          <button onClick={() => handleUpdate(item)}>Edit</button>
          <button onClick={() => deleteItem(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
export default ItemList;
