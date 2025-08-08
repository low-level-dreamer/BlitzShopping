// Claude was used to debug the original code written by our team.

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
    try {
      setLoading(true);
      setError(null);
      
      // Fixed: Added http:// protocol
      const response = await fetch(`http://localhost:${port}${apiEndpoint}?table=${tableName}`);

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

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
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

  // Main render
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
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b"
                  >
                    {cell}
                  </td>
                ))}
                <td>
                  <div className="action-buttons">
                    <button className="update-button">Update</button>
                    <button className="delete-button" onClick={()=>DeleteProduct(row[0])}>Delete</button>
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
      {/* <button
        onClick={ResetDB}
        className="update-button"
      >
        Reset Data
      </button> */}
    </div>
  );
};



export default GetTable;