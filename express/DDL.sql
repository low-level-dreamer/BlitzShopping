DROP TABLE IF EXISTS Customers;
CREATE TABLE Customers(
    customerID int AUTO_INCREMENT UNIQUE NOT NULL,
    firstName varchar(45) NOT NULL,
    lastName varchar(45) NOT NULL,
    phoneNo varchar(45) NOT NULL,
    email varchar(45) NOT NULL,
    cardNumber varchar(45),
    dateCreated datetime NOT NULL,
    PRIMARY KEY (customerID)
);

DROP TABLE IF EXISTS Logistics;
CREATE TABLE Logistics (
    courierID int AUTO_INCREMENT UNIQUE NOT NULL,
    courierName varchar(45) NOT NULL,
    shippingTime tinyint NOT NULL,
    PRIMARY KEY (courierID)
);

DROP TABLE IF EXISTS salesProducts;
CREATE TABLE salesProducts (
    salesID int NOT NULL,
    sku varchar(20) NOT NULL,
    FOREIGN KEY (salesID) REFERENCES Sales(salesID) ON DELETE CASCADE,
    FOREIGN KEY (sku) REFERENCES Products(sku) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Products;
CREATE TABLE Products (
    sku varchar(45) NOT NULL,
    productName varchar(45) NOT NULL,
    productDesc varchar(300) NOT NULL,
    price decimal(18,2) NOT NULL,
    category enum('Clothing','Electronics','Accesories','Software') NOT NULL,
    volume decimal(18,3) NOT NULL,
    weight decimal(18,3) NOT NULL,
    PRIMARY KEY (sku)
);

DROP TABLE IF EXISTS Sales;
CREATE TABLE Sales (
    salesID int AUTO_INCREMENT UNIQUE NOT NULL,
    customerID int NOT NULL,
    address varchar(45) NOT NULL,
    country varchar(45) NOT NULL,
    dateOfSale datetime NOT NULL,
    courierID int NOT NULL,
    orderAmount decimal(18,2) NOT NULL,
    orderStatus enum('Pending', 'Shipped', 'Delivered', 'Canceled') NOT NULL,
    PRIMARY KEY (salesID),
    FOREIGN KEY (courierID) REFERENCES Logistics(courierID) ON DELETE CASCADE,
    FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON DELETE CASCADE
);

-- # Citation for the following queries:
-- # Date: 07/23/2025
-- # Copied from chatgpt and tested the results
-- # Source URL: https://chatgpt.com/
-- # Prompt Summary: Asks the AI to generate example insert quieries based on the provided quieries

INSERT INTO Customers (firstName, lastName, phoneNo, email, cardNumber, dateCreated) VALUES 
('John', 'Smith', '555-1234', 'john.smith@email.com', '4532123456789012', '2024-01-15 10:30:00'),
('Sarah', 'Johnson', '555-5678', 'sarah.j@email.com', '4532987654321098', '2024-01-16 14:22:00'),
('Mike', 'Davis', '555-9012', 'mike.davis@email.com', NULL, '2024-01-17 09:15:00'),
('Emily', 'Wilson', '555-3456', 'emily.w@email.com', '4532111222333444', '2024-01-18 16:45:00'),
('Robert', 'Brown', '555-7890', 'rob.brown@email.com', '4532555666777888', '2024-01-19 11:20:00');

INSERT INTO Logistics (courierName, shippingTime) VALUES 
('FedEx Express', 1),
('USPS Priority', 3),
('UPS Ground', 5),
('FedEx Ground', 4),
('USPS Ground Advantage', 7);

INSERT INTO Products (sku, productName, productDesc, price, category, volume, weight) VALUES 
('SHIRT001', 'Cotton T-Shirt', 'Comfortable 100% cotton t-shirt available in multiple colors', 19.99, 'Clothing', 0.150, 0.200),
('LAPTOP001', 'Gaming Laptop', 'High-performance laptop with dedicated graphics card for gaming', 1299.99, 'Electronics', 2.500, 2.800),
('WATCH001', 'Smart Watch', 'Fitness tracking smart watch with heart rate monitor', 249.99, 'Accesories', 0.050, 0.150),
('SOFT001', 'Antivirus Software', 'Premium antivirus software with 1-year subscription', 59.99, 'Software', 0.001, 0.001),
('JEANS001', 'Denim Jeans', 'Classic blue denim jeans with comfortable fit', 79.99, 'Clothing', 0.400, 0.600);

INSERT INTO Sales (customerID, address, country, dateOfSale, courier, orderAmount, orderStatus) VALUES 
(1, '123 Main St', 'USA', '2024-01-20 10:15:00', 'FedEx', 19.99, 'Delivered'),
(2, '456 Oak Ave', 'USA', '2024-01-21 14:30:00', 'USPS', 1299.99, 'Shipped'),
(3, '789 Pine Rd', 'Canada', '2024-01-22 09:45:00', 'USPS', 249.99, 'Pending'),
(1, '123 Main St', 'USA', '2024-01-23 16:20:00', 'FedEx', 139.98, 'Delivered'),
(4, '321 Elm St', 'USA', '2024-01-24 11:10:00', 'USPS', 59.99, 'Canceled');

INSERT INTO salesProducts (salesID, sku) VALUES 
(1, 'SHIRT001'),
(2, 'LAPTOP001'),
(3, 'WATCH001'),
(4, 'SHIRT001'),
(4, 'JEANS001'),
(5, 'SOFT001');