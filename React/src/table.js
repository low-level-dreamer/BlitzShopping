// Claude was used to debug the original code written by our team.

//This file includes a react module that renders table from Blitz Shopping's database
import React, { useState, useEffect } from 'react';
import {ResetDB,DeleteProduct} from './cud'

const GetTable = ({ tableName, headers,apiEndpoint, port }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchProducts();
    
  }, []);
  const fetchProducts = async () => {
    //Get products from API endpoint
    //Format: json [[entry1],[entry2]]
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://classwork.engr.oregonstate.edu:${port}${apiEndpoint}?table=${tableName}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
     
      const jsonData = await response.json();
      setData(jsonData);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCellChange = (rowIndex, cellIndex, value) => {
    const newData = [...data];
    newData[rowIndex][cellIndex] = value;
    setData(newData);
  };

  const updateProduct = async (rowIndex) => {
    //Product update function
    //Param: int, the row Number of target update 
    try {
      setLoading(true);
      setError(null);

      const row = data[rowIndex];
      //Gather updated data
      const updateData ={
      productID: row[0],
      sku: row[0],
      productName: row[1],
      productDesc: row[2],
      price: row[3],
      category: row[4],
      volume: row[5],
      weight: row[6]
    };
    //Send updated table to Update endpoint
    const response = await fetch('http://classwork.engr.oregonstate.edu:9015/Products/Update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    alert('Product updated successfully!');
    await fetchProducts(); // Refresh the table to get latest data
      
    } catch (err) {
      setError(`Update failed: ${err.message}`);
      alert(`Update failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  // Handle loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error
  if (error) {
    return (
      <div>
        <h2>Error:</h2>
        <p>{error}</p>
        <button onClick={fetchProducts}>
          Retry
        </button>
      </div>
    );
  }

  // Main element
  return (
    <div>
      <h1>{tableName}</h1>
     
      <div>
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>
                  {header}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Table constructor */}
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b"
                  >
                    {/* All elements are displayed in input element now as default values */}
                    <input
                      type="text"
                      value={cell || ''}
                      onChange={(e) => handleCellChange(rowIndex, cellIndex, e.target.value)}
                      style={{
                        width: '100%',
                        padding: '4px 8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      readOnly={cellIndex === 0}
                    />
                  </td>
                ))}
                <td>
                  {/* update and delete buttons */}
                  <div className="action-buttons">
                    <button 
                      className="update-button"
                      onClick={() => updateProduct(rowIndex)}
                    >
                      Update
                    </button>
                    <button 
                      className="delete-button" 
                      onClick={() => DeleteProduct(row[0])}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     {/* Refresh page button */}
      <button
        onClick={fetchProducts}
        className="update-button"
      >
        Refresh Page
      </button>
    </div>
  );
};


const GetProductTable = ({ tableName, headers,apiEndpoint, port }) => {
  //Function specifically for product table to enable CUD for Products Table
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [originalSkus, setOriginalSkus] = useState([]);
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://classwork.engr.oregonstate.edu:9015/Products/Categories');
      const categoriesData = await response.json();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fixed: Added http:// protocol
      const response = await fetch(`http://classwork.engr.oregonstate.edu:${port}${apiEndpoint}?table=${tableName}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
     
      const jsonData = await response.json();
      setData(jsonData);
      const skus = jsonData.map(row => row[0]);
      setOriginalSkus(skus);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleCellChange = (rowIndex, cellIndex, value) => {
    const newData = [...data];
    newData[rowIndex][cellIndex] = value;
    setData(newData);
  };
  //Send updated table to Update endpoint
  const updateProduct = async (rowIndex) => {
    try {
      setLoading(true);
      setError(null);
      const row = data[rowIndex];
      const newSku = originalSkus[rowIndex]===row[0] ? null : row[0];
      
      const updateData ={
      //productID: row[0],
      sku: originalSkus[rowIndex],
      productName: row[1],
      productDesc: row[2],
      price: row[3],
      category: row[4],
      volume: row[5],
      weight: row[6],
      newSku:newSku
    };

      const response = await fetch('http://classwork.engr.oregonstate.edu:9015/Products/Update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert('Product updated successfully!');
      await fetchProducts(); // Refresh the table to get latest data
      
    } catch (err) {
      setError(`Update failed: ${err.message}`);
      alert(`Update failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  // Handle loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error
  if (error) {
    return (
      <div>
        <h2>Error:</h2>
        <p>{error}</p>
        <button onClick={fetchProducts}>
          Retry
        </button>
      </div>
    );
  }

  // Main Element
  return (
    <div>
      <h1>{tableName}</h1>
     
      <div>
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>
                  {header}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                  >
                    {cellIndex === 4 ? (
                      // Fifth column: Category dropdown
                      <select
                        value={cell || ''}
                        onChange={(e) => handleCellChange(rowIndex, cellIndex, e.target.value)}
                      >
                        <option value="">Select Category</option>
                        {categories.map((category, catIndex) => (
                          <option key={catIndex} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    ) : (
                      // other columns:regular input
                      <input
                        type="text"
                        value={cell || ''}
                        onChange={(e) => handleCellChange(rowIndex, cellIndex, e.target.value)}
                      />
                    )}
                  </td>
                ))}
                <td>
                  <div className="action-buttons">
                    <button 
                      className="update-button"
                      onClick={() => updateProduct(rowIndex)}
                    >
                      Update
                    </button>
                    <button 
                      className="delete-button" 
                      onClick={async () => {await DeleteProduct(row[0]); await fetchProducts();}}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
      <button
        onClick={fetchProducts}
        className="update-button"
      >
        Refresh Page
      </button>
    </div>
  );
};

export {GetTable,GetProductTable};