// Claude was used to debug the original code written by our team.

import React, { useState } from 'react';
import './App.css'
import {GetTable,GetProductTable} from './table';
import {ResetDB,DeleteProduct,AddProduct} from './cud'
const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [formData, setFormData] = useState({
    sku: '',
    productName: '',
    productDesc: '',
    price: '',
    category: '',
    volume: '',
    weight: ''
  });
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 const handleAddProduct = async () => {
    const success = await AddProduct(formData);
    
    if (success) {
      // Clear the form after successful submission
      setFormData({
        sku: '',
        productName: '',
        productDesc: '',
        price: '',
        category: '',
        volume: '',
        weight: ''
      });
      setRefreshTrigger(prev => prev + 1) //Increment the table key triggers a refresh
    }
  };
  //Navigation bar elements
  const renderNavigation = () => (
    <nav className="navigation">
      <div className="nav-container">
        {['Home', 'Customers', 'Products', 'Logistics', 'Sales','SalesProducts'].map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`nav-button ${currentPage === page ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}
      </div>
    </nav>
  );
  
  //Home page elements
  const renderHome = () => (
    <div className="home-container">
      <h1>Welcome to Blitz Shopping</h1>
      <p>One-stop shop for all your tech gear.</p>
      <button
        onClick={ResetDB}
        className="update-button"
      >
        Reset Data
      </button>
    </div>
  );
  //Add Customer form and Customer Table
  const renderCustomers = () => (
    <div className="page-container">
      <h2>Customers</h2>
      
      {/* <div className="form-container">
        <input type="text" placeholder="First Name" className="form-input" />
        <input type="text" placeholder="Last Name" className="form-input" />
        <input type="text" placeholder="Phone" className="form-input" />
        <input type="email" placeholder="Email" className="form-input" />
        <input type="text" placeholder="Card Number" className="form-input" />
        <button className="add-button">Add</button>
      </div> */}

      <div>
      <GetTable 
        key="customer-table"
        tableName="Customers"
        headers={["Customer ID","First Name", "Last Name", "Phone NO","Email","Card Number", "Date Created"]}
        apiEndpoint="/api/get"
        port={9015}
      />
      </div>
    </div>
  );
  //Add Products form and Products Table
  const renderProducts = () => (
    <div className="page-container">
      <h2>Products</h2>
      
      <div className="form-container">
         <input 
          type="text" 
          name="sku" 
          placeholder="SKU" 
          className="form-input" 
          value={formData.sku}
          onChange={handleInputChange}
        />
        <input 
          type="text" 
          name="productName" 
          placeholder="Product Name" 
          className="form-input" 
          value={formData.productName}
          onChange={handleInputChange}
        />
        <input 
          type="text" 
          name="productDesc" 
          placeholder="Description" 
          className="form-input" 
          value={formData.productDesc}
          onChange={handleInputChange}
        />
        <input 
          type="number" 
          name="price" 
          placeholder="Price" 
          className="form-input" 
          value={formData.price}
          onChange={handleInputChange}
        />
        <input 
          type="text" 
          name="category" 
          placeholder="Category" 
          className="form-input" 
          value={formData.category}
          onChange={handleInputChange}
        />
        <input 
          type="number" 
          name="volume" 
          placeholder="Volume" 
          className="form-input" 
          value={formData.volume}
          onChange={handleInputChange}
        />
        <input 
          type="number" 
          name="weight" 
          placeholder="Weight" 
          className="form-input" 
          value={formData.weight}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={handleAddProduct}>Add</button>
      </div>
      <div>
      {/* Product table implementation with M:M deletion and Update */}
      <GetProductTable 
        key={`products-table-${refreshTrigger}`}
        tableName="Products"
        headers={["sku","Product Name", "Product Description", "Price","Category","Volume", "Weight"]}
        apiEndpoint="/api/get"
        port={9015}
      />
      </div>
    </div>
  );
  //Add shipping method form and Logistics Table
  const renderLogistics = () => (
    <div className="page-container">
      <h2>Logistics</h2>
      
      {/* <div className="form-container">
        <input type="text" placeholder="Courier Name" className="form-input" />
        <input type="number" placeholder="Shipping Time (days)" className="form-input" />
        <button className="add-button">Add</button>
      </div> */}

      <div>
      <GetTable 
        key="Logistics-table"
        tableName="Logistics"
        headers={["Courier ID","Courier Name", "Shipping Time (Days)"]}
        apiEndpoint="/api/get"
        port={9015}
      />
      </div>
    </div>
  );
  //Add Sales entry form and sales table
  const renderSales = () => (
    <div className="page-container">
      <h2>Sales</h2>
      
      {/* <div className="form-container">
        <input type="number" placeholder="Customer ID" className="form-input" />
        <input type="text" placeholder="Address" className="form-input" />
        <input type="text" placeholder="Country" className="form-input" />
        <input type="number" placeholder="Courier ID" className="form-input" />
        <select className="form-select">
          <option>Pending</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Canceled</option>
        </select>
        <button className="add-button">Add</button>
      </div> */}

      <div>
      <GetTable 
        key="sales-table"
        tableName="Sales"
        headers={["Sales ID","Customer ID","Address","Country","Date of Sale","Courier ID","OrderAmount", "Order Status"]}
        apiEndpoint="/api/get"
        port={9015}
      />
      </div>
    </div>
  );
// Add Sales Product form and SalesProduct Table
const renderSalesProduct = () => (
    <div className="page-container">
      <h2>Sales Products</h2>
      
      {/* <div className="form-container">
        <input type="number" placeholder="Sales ID" className="form-input" />
        <input type="text" placeholder="SKU" className="form-input" />
        <select className="form-select">
          <option>Sales ID</option>
          <option>Customer ID</option>
        </select>
        <button className="add-button">Add</button>
      </div> */}

      <div>
        <GetTable 
        key="salesproduct-table"
        tableName="SalesProducts"
        headers={["Sales ID","SKU"]}
        apiEndpoint="/api/get"
        port={9015}/>
      {/* The below was a more informative table, Saved for future use.
      <GetTable 
        key="salesproduct-table"
        tableName="SalesProducts"
        headers={["Sales ID","Date of Sale","SKUs","Product Names","Courier Name","Total Price","Address", "Total Volume", "Total Weight"]}
        apiEndpoint="/api/get-sales"
        port={9015}
      /> */}
      </div>
    </div>
  );
  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return renderHome();
      case 'Customers':
        return renderCustomers();
      case 'Products':
        return renderProducts();
      case 'Logistics':
        return renderLogistics();
      case 'Sales':
        return renderSales();
      case 'SalesProducts':
        return renderSalesProduct();
      default:
        return renderHome();
    }
  };

  return (
    <div>
      {renderNavigation()}
      {renderPage()}
    </div>
  );
};

export default App;