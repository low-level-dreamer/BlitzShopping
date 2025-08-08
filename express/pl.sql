-- Prompt - "How should I create a procedure to refresh tables back to original state"
-- Prompt - "Generate me an outline of a PL SQL procedure to update a table that also updates its intersection table"

DELIMITER //
-- Procedure to reset database to original state

DROP PROCEDURE IF EXISTS refresh_data;

CREATE PROCEDURE refresh_data()
BEGIN
	START TRANSACTION;

    SET FOREIGN_KEY_CHECKS = 0;

	TRUNCATE TABLE SalesProducts;
	TRUNCATE TABLE Sales;
	TRUNCATE TABLE Products;
	TRUNCATE TABLE Logistics;
	TRUNCATE TABLE Customers;

    INSERT INTO Customers (firstName, lastName, phoneNo, email, cardNumber, dateCreated) VALUES 
    ('John', 'Smith', '555-1234', 'john.smith@email.com', '4532123456789012', '2024-01-15'),
    ('Sarah', 'Johnson', '555-5678', 'sarah.j@email.com', '4532987654321098', '2024-01-16'),
    ('Mike', 'Davis', '555-9012', 'mike.davis@email.com', '8475987654481798', '2024-01-17'),
    ('Emily', 'Wilson', '555-3456', 'emily.w@email.com', '4532111222333444', '2024-01-18'),
    ('Robert', 'Brown', '555-7890', 'rob.brown@email.com', '4532555666777888', '2024-01-19');

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

    INSERT INTO Sales (customerID, address, country, dateOfSale, courierID, orderAmount, orderStatus) VALUES 
    (1, '123 Main St', 'USA', '2024-01-20', 1, 19.99, 'Delivered'),
    (2, '456 Oak Ave', 'USA', '2024-01-21', 2, 1299.99, 'Shipped'),
    (3, '789 Pine Rd', 'Canada', '2024-01-22', 3, 249.99, 'Pending'),
    (1, '123 Main St', 'USA', '2024-01-23', 4, 139.98, 'Delivered'),
    (4, '321 Elm St', 'USA', '2024-01-24', 5, 59.99, 'Canceled');

    INSERT INTO SalesProducts (salesID, sku) VALUES 
    (1, 'SHIRT001'),
    (2, 'LAPTOP001'),
    (3, 'WATCH001'),
    (4, 'SHIRT001'),
    (4, 'JEANS001'),
    (5, 'SOFT001');
    
	SET FOREIGN_KEY_CHECKS = 1;
    COMMIT;
END //

DELIMITER ;
-- Get Sales entries
DELIMITER //

-- DROP PROCEDURE IF EXISTS get_sales;

-- CREATE PROCEDURE get_sales()
-- BEGIN
--     SELECT
--         s.salesID,
--         s.dateOfSale,
--         GROUP_CONCAT(sp.sku ORDER BY sp.sku SEPARATOR ', ') as skuList,
--         GROUP_CONCAT(p.productName ORDER BY sp.sku SEPARATOR ', ') as productNames,
--         l.courierName,
--         SUM(p.price) as totalPrice,
--         s.address,
--         SUM(p.volume) as totalVolume,
--         SUM(p.weight) as totalWeight,
--         COUNT(sp.sku) as productCount
--     FROM Sales s
--     LEFT JOIN SalesProducts sp ON s.salesID = sp.salesID
--     LEFT JOIN Products p ON sp.sku = p.sku
--     LEFT JOIN Logistics l ON l.courierID = s.courierID
--     GROUP BY s.salesID, s.dateOfSale, l.courierName, s.address;
-- END //
-- DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS get_sales;
CREATE PROCEDURE get_sales()
BEGIN
    SELECT
        s.salesID,
        s.dateOfSale,
        sp.sku,
        p.productName,
        l.courierName,
        p.price,
        s.address,
        p.volume,
        p.weight
    FROM Sales s
    LEFT JOIN SalesProducts sp ON s.salesID = sp.salesID
    LEFT JOIN Products p ON sp.sku = p.sku
    LEFT JOIN Logistics l ON l.courierID = s.courierID
    ORDER BY s.salesID, sp.sku;
END //
DELIMITER ;

DELIMITER //
-- Procedure to create new product

DROP PROCEDURE IF EXISTS create_product;

CREATE PROCEDURE create_product(
    IN in_sku VARCHAR(45),
    IN in_productName VARCHAR(45),
    IN in_productDesc VARCHAR(300),
    IN in_price DECIMAL(18, 2),
    IN in_category VARCHAR(45),
    IN in_volume DECIMAL(18, 3),
    IN in_weight DECIMAL(18, 3)
)
BEGIN
    INSERT INTO Products (sku, productName, productDesc, price, category, volume, weight)
    VALUES (in_sku, in_productName, in_productDesc, in_price, in_category, in_volume, in_weight);
END //

DELIMITER ;

DELIMITER //
-- Procedure to delete product

DROP PROCEDURE IF EXISTS delete_product;

CREATE PROCEDURE delete_product(
    IN in_sku INT
)
BEGIN
    DELETE FROM Products
    WHERE sku = in_sku;
END //

DELIMITER ;

DELIMITER //

-- Procedure for updating product as well as the intersection table
DROP PROCEDURE IF EXISTS update_product;

CREATE PROCEDURE update_product(
    IN in_productID INT,
    IN in_sku VARCHAR(45),
    IN in_productName VARCHAR(300),
    IN in_productDesc TEXT,
    IN in_price DECIMAL(18, 2),
    IN in_category VARCHAR(45),
    IN in_volume DECIMAL(18, 3),
    IN in_weight DECIMAL(18, 3)
)
BEGIN
    DECLARE old_sku VARCHAR(45);
    START TRANSACTION;
    -- Hold the current sku value in a separate variable
    SELECT sku INTO old_sku
    FROM Products
    WHERE sku = in_productID;

    UPDATE Products
    SET
        sku = in_sku,
        productName = in_productName,
        productDesc = in_productDesc,
        price = in_price,
        category = in_category,
        volume = in_volume,
        weight = in_weight
    WHERE sku = in_productID;

    UPDATE SalesProducts
    SET sku = in_sku
    WHERE sku = old_sku;

    COMMIT;
END //

DELIMITER ;