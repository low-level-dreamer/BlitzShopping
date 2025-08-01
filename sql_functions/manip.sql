-------------------------------------------------------------------------------------------------
-- Select Queries
-------------------------------------------------------------------------------------------------
--Get all customers
SELECT customerID, firstName, lastName, phoneNo, email, cardNumber,dateCreated FROM Customers
ORDER BY lastName,firstName;

-- Search one customer by first and last name
SELECT customerID, firstName, lastName, phoneNo, email, cardNumber,dateCreated FROM Customers
WHERE firstName=@inputFirstName AND lastName=@inputLastName

--Get product catalog
SELECT sku, productName, productDesc, price, category, volume, weight FROM Products
ORDER BY productName;

--Search product By Name
SELECT sku, productName, productDesc, price, category, volume, weight FROM Products
WHERE productName=@inputProductName

-- Get all Sales orders
SELECT s.salesID, s.address, s.country, s.dateOfSale, s.orderAmount, s.orderStatus, c.firstName, c.lastName,
c.customerID, l.courierName
FROM Sales s
LEFT JOIN Customers c ON s.customerID=c.customerID
LEFT JOIN Logistics l ON s.courierID=l.courierID
ORDER BY s.salesID DESC;

--Seach for an order by order number
SELECT s.salesID, s.address, s.country, s.dateOfSale, s.orderAmount, s.orderStatus, c.firstName, c.lastName,
c.customerID, l.courierName
FROM Sales s
LEFT JOIN Customers c ON s.customerID=c.customerID
LEFT JOIN Logistics l ON s.courierID=l.courierID
WHERE s.salesID=@inputOrderNumber

--Get all Shipping methods
SELECT * FROM Logistics;

--Seach for a shipping method by name
SELECT * FROM Logistics
WHERE courierName=@inputCourierName

--Show all Sales with products
SELECT sp.salesID, sp.sku, sp.quantity, (sp.quantity*p.unitPrice) AS orderTotal,
s.dateOfSale, s.orderStatus, c.firstName, c.lastName p.productName,p.category
FROM SalesProducts sp
LEFT JOIN Sales s ON sp.salesID=s.salesID
LEFT JOIN Products p ON sp.sku=p.sku
LEFT JOIN Customers c ON s.customerID=c.customerID
ORDER BY sp.salesID DESC;

--Get products for a sale by orderNumber
SELECT sp.salesID, sp.sku,sp.quantity,sp.unitPrice,(sp.quantity*sp.unitPrice) AS orderTotal,
p.productName,p.Price, p.category
FROM SalesProducts sp
LEFT JOIN Sales s ON sp.salesID=s.salesID
LEFT JOIN Products p ON sp.sku=p.sku
LEFT JOIN Customers c ON s.customerID=c.customerID
WHERE sp.salesID=@inputOrderNumber

-------------------------------------------------------------------------------------------------
-- Insert Queries
-------------------------------------------------------------------------------------------------

--Insert customer
INSERT INTO customer (firstName,lastName,phoneNo,email,cardNumber)
VALUES(@inputFirstName,@inputLastName,@inputPhoneNo,@inputEmail,@inputCardNumber);

--Insert a product
INSERT INTO Products (sku,productName, productDesc,price,category,volume,weight)
VALUES(@inputSKU,@inputProductName, @inputProductDesc, @inputPrice, @inputCategory, @inputVolume,@inputWeight);

--Insert a Shipping Method
INSERT INTO Logistics (courierName, shippingTime)
VALUES (@inputCourierName,@inputShippingTime);

INSERT INTO Sales (address, country, orderAmount, customerID, courierID, orderStatus)
VALUES (@addressInput, @countryInput, @orderAmountInput, 
    (SELECT CustomerID FROM Customers WHERE email = @customerEmailinput),
    @CourierIDinput,
    @orderStatusinput
);
INSERT INTO SalesProducts (salesID, sku, quantity)
VALUES(
    @SalesIDinput,
    @skuinput,
    @quantityinput,
)

-------------------------------------------------------------------------------------------------
-- Update Queries
-------------------------------------------------------------------------------------------------

--Update Customers using email
UPDATE Customers 
SET firstName = @firstNameInput,
    lastName = @lastNameInput,
    phoneNo = @phoneNoInput,
    email = @newEmailInput,
    cardNumber = @cardNumberInput
WHERE email = @currentEmailInput;

--update Products using sku
UPDATE Products 
SET productName = @newProductNameInput,
    productDesc = @productDescInput,
    price = @priceInput,
    category = @categoryinput,
    volume = @volumeInput,
    weight = @weightInput
WHERE sku = @skuInput;

--update using logistics ID
UPDATE Logistics
SET courierName=@courierNameInput,
shippingTime=@shippingTimeInput,
WHERE courierID=@courierIDInput;

--update sales using order number
UPDATE Sales s
SET s.address=@addressInput,
s.country=@countryInput,
s.courierID=@courierIDInput
s.orderStatus=@orderStatusInput
WHERE s.salesID=@orderNumberInput;

--update salesproducts quantity using email,orderNumber and SKU
UPDATE SalesProducts sp
LEFT JOIN Sales s ON sp.SalesID=s.salesID
LEFT JOIN Customers c ON s.customerID=c.customerID
LEFT JOIN Products p ON sp.sku=p.sku
SET sp.quantity = @quantityInput
sp.unitPrice=@unitPriceInput
WHERE c.email=@emailInput AND sp.salesID=@orderNumberInput AND p.sku=@skuInput;

-------------------------------------------------------------------------------------------------
-- Delete Queries
-------------------------------------------------------------------------------------------------

--Delete customer by email
DELETE FROM Customers WHERE email=@emailInput;

--Delete Product by SKU
DELETE FROM Products WHERE sku=@skuInput;

--Delete courier by ID
DELETE FROM Logistics WHERE courierID=@courierIDInput;

--DELETE sale by orderNumber
DELETE FROM Sales WHERE salesID=@orderNumberInput

--Delete order product by orderNumber and SKU
DELETE FROM SalesProduct WHERE salesID@orderNumberInput AND sku=@skuInput;
