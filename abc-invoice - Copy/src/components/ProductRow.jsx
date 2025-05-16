import React from 'react';

const ProductRow = ({ index, value, onChange, onRemove }) => {
  const handleChange = (e) => {
    onChange(index, { ...value, [e.target.name]: e.target.value });
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td><input type="text" name="productName" value={value.productName} onChange={handleChange} placeholder="Product Name" /></td>
      <td><input type="text" name="packing" value={value.packing} onChange={handleChange} placeholder="Packing" /></td>
      <td><input type="number" name="quantity" value={value.quantity} onChange={handleChange} placeholder="Qty" /></td>
      <td><input type="number" name="rate" value={value.rate} onChange={handleChange} placeholder="Rate" /></td>
      <td><input type="number" name="scheme" value={value.scheme} onChange={handleChange} placeholder="Scheme" /></td>
      <td><input type="number" name="schemeValue" value={value.schemeValue} onChange={handleChange} placeholder="Scheme Value" /></td>
      <td><input type="number" name="total" value={value.total} readOnly placeholder="Total" /></td>
      <td><button type="button" onClick={() => onRemove(index)} style={{ color: 'red' }}>Remove</button></td>
    </tr>
  );
};

export default ProductRow; 