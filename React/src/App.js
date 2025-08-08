import React, { useState } from 'react';
import './App.css'
import GetTable from './table';
import {ResetDB,DeleteProduct} from './cud'
const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');

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

  const renderCustomers = () => (
    <div className="page-container">
      <h2>Customers</h2>
      
      <div className="form-container">
        <input type="text" placeholder="First Name" className="form-input" />
        <input type="text" placeholder="Last Name" className="form-input" />
        <input type="text" placeholder="Phone" className="form-input" />
        <input type="email" placeholder="Email" className="form-input" />
        <input type="text" placeholder="Card Number" className="form-input" />
        <button className="add-button">Add</button>
      </div>

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

  const renderProducts = () => (
    <div className="page-container">
      <h2>Products</h2>
      
      <div className="form-container">
        <input type="text" placeholder="SKU" className="form-input" />
        <input type="text" placeholder="Product Name" className="form-input" />
        <input type="text" placeholder="Description" className="form-input" />
        <input type="number" placeholder="Price" className="form-input" />
        <select className="form-select">
          <option>Clothing</option>
          <option>Electronics</option>
          <option>Accesories</option>
          <option>Software</option>
        </select>
        <input type="number" placeholder="Volume" className="form-input" />
        <input type="number" placeholder="Weight" className="form-input" />
        <button className="add-button">Add</button>
      </div>
      <div>
      <GetTable 
        key="products-table"
        tableName="Products"
        headers={["sku","Product Name", "Product Description", "Price","Category","Volume", "Weight"]}
        apiEndpoint="/api/get"
        port={9015}
      />
      </div>
    </div>
  );

  const renderLogistics = () => (
    <div className="page-container">
      <h2>Logistics</h2>
      
      <div className="form-container">
        <input type="text" placeholder="Courier Name" className="form-input" />
        <input type="number" placeholder="Shipping Time (days)" className="form-input" />
        <button className="add-button">Add</button>
      </div>

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

  const renderSales = () => (
    <div className="page-container">
      <h2>Sales</h2>
      
      <div className="form-container">
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
      </div>

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
const renderSalesProduct = () => (
    <div className="page-container">
      <h2>Sales</h2>
      
      <div className="form-container">
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
      </div>

      <div>
      <GetTable 
        key="salesproduct-table"
        tableName="SalesProducts"
        headers={["Sales ID","Date of Sale","SKUs","Product Names","Courier Name","Total Price","Address", "Total Volume", "Total Weight"]}
        apiEndpoint="/api/get-sales"
        port={9015}
      />
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