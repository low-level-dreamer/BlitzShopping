// Imports/Set up taken from Canvas Modules Exploration - Implementing CUD operations in your app and 
// and Exploration: PL/SQL part 2, Stored Procedures for CUD

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const db = require('./database/db-connector');

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});

// Refresh Data
app.post('/Home/Refresh', async function (req, res) {
  try {
    const refresh_data = 'CALL refresh_data();'
    await db.query(refresh_data)
    res.status(200).send('Refresh successful')
  } catch (err) {
    console.error(err)
    res.status(500).send('Refresh failed')
  }
});

// Delete Product
app.post('/Products/Delete', async function (req, res) {
  try {
    const product_id = req.body.productID; 
    const delete_product = 'CALL delete_product(?);'
    await db.query(delete_product, [product_id])
    res.status(200).send('Product deleted successfuly')
  } catch (err) {
    console.error(err)
    res.status(500).send('Delete failed')
  }
});

// Create Product
app.post('/Products/Add', async function (req, res) {
    try {
        let data = req.body
        const create_product = 'CALL create_product(?, ?, ?, ?, ?, ?, ?);'
        await db.query(create_product, [data.sku, 
                                        data.productName, 
                                        data.productDesc, 
                                        data.price, 
                                        data.category, 
                                        data.volume, 
                                        data.weight])
        res.status(200).send('Creation successful')
    } catch(err) {
      console.error(err)
      res.status(500).send('Creation failed')
    }
});

// Updating product
app.post('/Products/Update', async function (req, res) {
    try {
        const data = req.body
        const update_product = 'CALL update_product(?, ?, ?, ?, ?, ?, ?, ?);'
        await db.query(update_product, [data.productID,
                                        data.sku, 
                                        data.productName, 
                                        data.productDesc, 
                                        data.price, 
                                        data.category, 
                                        data.volume, 
                                        data.weight])
        res.status(200).send('Update successful')
    } catch(err) {
      console.error(err)
      res.status(500).send('Update failed')
    }
});