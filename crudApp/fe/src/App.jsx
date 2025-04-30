import { useState, useEffect } from "react";
import axios from "axios";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
function App() {
  const [items, setItems] = useState([]);
  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/api/items");
    setItems(res.data);
  };
  useEffect(() => {
    fetchItems();
  }, []);
  const addItem = async (item) => {
    await axios.post("http://localhost:5000/api/items", item);
    fetchItems();
  };
  const updateItem = async (id, updatedItem) => {
    await axios.put(`http://localhost:5000/api/items/${id}`, updatedItem);
    fetchItems();
  };
  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    fetchItems();
  };
  return (
    <div style={{ padding: 20 }}>
      <h1>Simple MERN CRUD App</h1>
      <ItemForm addItem={addItem} />
      {items.length === 0 ? (
        "No items found. Please add some items."
      ) : (
        <ItemList
          items={items}
          updateItem={updateItem}
          deleteItem={deleteItem}
        />
      )}
    </div>
  );
}
export default App;
