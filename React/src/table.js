import React, { useState, useEffect } from 'react';
const ProductTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/get');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const jsonData = await response.json();
      setData(jsonData);
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
    return (
        <div>
        <h1>Products</h1>
        
        <div>
            <table>
            <thead>
                <tr>
                //fix later
                {headers.map((header, index) => (
                    <th 
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                    >
                    {header}
                    </th>
                ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                <tr 
                    key={rowIndex}
                    className="hover:bg-gray-50 transition-colors"
                >
                    {row.map((cell, cellIndex) => (
                    <td 
                        key={cellIndex}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b"
                    >
                        {cell}
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        
        
        <button 
            onClick={fetchProducts}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
            Refresh Data
        </button>
        </div>
    );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


}