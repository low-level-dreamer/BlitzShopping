import React, { useState } from 'react';
import './App.css'

const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');

  const renderNavigation = () => (
    <nav className="navigation">
      <div className="nav-container">
        {['Home', 'Customers', 'Products', 'Logistics', 'Sales'].map(page => (
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

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Card Number</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John</td>
            <td>Smith</td>
            <td>555-1234</td>
            <td>john.smith@email.com</td>
            <td>4532123456789012</td>
            <td>2024-01-15 10:30:00</td>
            <td>
              <div className="action-buttons">
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Sarah</td>
            <td>Johnson</td>
            <td>555-5678</td>
            <td>sarah.j@email.com</td>
            <td>4532987654321098</td>
            <td>2024-01-16 14:22:00</td>
            <td>
              <div className="action-buttons">
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Mike</td>
            <td>Davis</td>
            <td>555-9012</td>
            <td>mike.davis@email.com</td>
            <td>-</td>
            <td>2024-01-17 09:15:00</td>
            <td>
              <div className="action-buttons">
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Emily</td>
            <td>Wilson</td>
            <td>555-3456</td>
            <td>emily.w@email.com</td>
            <td>4532111222333444</td>
            <td>2024-01-18 16:45:00</td>
            <td>
              <div className="action-buttons">
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Robert</td>
            <td>Brown</td>
            <td>555-7890</td>
            <td>rob.brown@email.com</td>
            <td>4532555666777888</td>
            <td>2024-01-19 11:20:00</td>
            <td>
              <div className="action-buttons">
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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

      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Volume</th>
            <th>Weight</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SHIRT001</td>
            <td>Cotton T-Shirt</td>
            <td>Comfortable 100% cotton t-shirt available in multiple colors</td>
            <td>$19.99</td>
            <td>Clothing</td>
            <td>0.150</td>
            <td>0.200</td>
            <td>
              <div className="action-buttons">
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>LAPTOP001</td>
            <td>Gaming Laptop</td>
            <td>High-performance laptop with dedicated graphics card for gaming</td>
            <td>$1299.99</td>
            <td>Electronics</td>
            <td>2.500</td>
            <td>2.800</td>
            <td>
              <div className="action-buttons">
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>WATCH001</td>
            <td>Smart Watch</td>
            <td>Fitness tracking smart watch with heart rate monitor</td>
            <td>$249.99</td>
            <td>Accesories</td>
            <td>0.050</td>
            <td>0.150</td>
            <td>
              <div className="action-buttons">
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>SOFT001</td>
            <td>Antivirus Software</td>
            <td>Premium antivirus software with 1-year subscription</td>
            <td>$59.99</td>
            <td>Software</td>
            <td>0.001</td>
            <td>0.001</td>
            <td>
              <div className="action-buttons">
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>JEANS001</td>
            <td>Denim Jeans</td>
            <td>Classic blue denim jeans with comfortable fit</td>
            <td>$79.99</td>
            <td>Clothing</td>
            <td>0.400</td>
            <td>0.600</td>
            <td>
              <div className="action-buttons">
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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

      <table>
        <thead>
          <tr>
            <th>Courier ID</th>
            <th>Courier Name</th>
            <th>Shipping Time (days)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>FedEx Express</td>
            <td>1</td>
            <td>
              <div className="action-buttons">
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>USPS Priority</td>
            <td>3</td>
            <td>
              <div className="action-buttons">
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>UPS Ground</td>
            <td>5</td>
            <td>
              <div className="action-buttons">
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>FedEx Ground</td>
            <td>4</td>
            <td>
              <div className="action-buttons">
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>USPS Ground Advantage</td>
            <td>7</td>
            <td>
              <div className="action-buttons">
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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

      <table>
        <thead>
          <tr>
            <th>Sales ID</th>
            <th>Customer ID</th>
            <th>Address</th>
            <th>Country</th>
            <th>Date of Sale</th>
            <th>Courier ID</th>
            <th>Order Amount</th>
            <th>Order Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>123 Main St</td>
            <td>USA</td>
            <td>2024-01-20 10:15:00</td>
            <td>1</td>
            <td>$19.99</td>
            <td>Delivered</td>
            <td>
              <div className="action-buttons">
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>2</td>
            <td>456 Oak Ave</td>
            <td>USA</td>
            <td>2024-01-21 14:30:00</td>
            <td>2</td>
            <td>$1299.99</td>
            <td>Shipped</td>
            <td>
              <div className="action-buttons">
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>3</td>
            <td>789 Pine Rd</td>
            <td>Canada</td>
            <td>2024-01-22 09:45:00</td>
            <td>3</td>
            <td>$249.99</td>
            <td>Pending</td>
            <td>
              <div className="action-buttons">
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>1</td>
            <td>123 Main St</td>
            <td>USA</td>
            <td>2024-01-23 16:20:00</td>
            <td>4</td>
            <td>$139.98</td>
            <td>Delivered</td>
            <td>
              <div className="action-buttons">
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>4</td>
            <td>321 Elm St</td>
            <td>USA</td>
            <td>2024-01-24 11:10:00</td>
            <td>5</td>
            <td>$59.99</td>
            <td>Canceled</td>
            <td>
              <div className="action-buttons">
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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