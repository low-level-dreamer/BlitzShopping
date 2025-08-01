# ########################################
# ########## SETUP

from flask import Flask, render_template, request, redirect
import database.db_connector as db

PORT =9528

app = Flask(__name__)

# ########################################
# ########## ROUTE HANDLERS

@app.route("/", methods=["GET"])
def home():
    try:
        return render_template("home.j2")
    except Exception as e:
        print(f"Error rendering home page: {e}")
        return "An error occurred while rendering the home page.", 500


@app.route("/customers", methods=["GET"])
def customers():
    try:
        dbConnection = db.connectDB()
        query = "SELECT * FROM Customers;"
        customers = db.query(dbConnection, query).fetchall()
        return render_template("customers.j2", customers=customers)
    except Exception as e:
        print(f"Error fetching customers: {e}")
        return "An error occurred while fetching customer data.", 500
    finally:
        if "dbConnection" in locals():
            dbConnection.close()


@app.route("/products", methods=["GET"])
def products():
    try:
        dbConnection = db.connectDB()
        query = "SELECT * FROM Products;"
        products = db.query(dbConnection, query).fetchall()
        return render_template("products.j2", products=products)
    except Exception as e:
        print(f"Error fetching products: {e}")
        return "An error occurred while fetching product data.", 500
    finally:
        if "dbConnection" in locals():
            dbConnection.close()


@app.route("/logistics", methods=["GET"])
def logistics():
    try:
        dbConnection = db.connectDB()
        query = "SELECT * FROM Logistics;"
        logistics = db.query(dbConnection, query).fetchall()
        return render_template("logistics.j2", logistics=logistics)
    except Exception as e:
        print(f"Error fetching logistics: {e}")
        return "An error occurred while fetching logistics data.", 500
    finally:
        if "dbConnection" in locals():
            dbConnection.close()


@app.route("/sales", methods=["GET"])
def sales():
    try:
        dbConnection = db.connectDB()
        query = "SELECT * FROM Sales;"
        sales = db.query(dbConnection, query).fetchall()
        return render_template("sales.j2", sales=sales)
    except Exception as e:
        print(f"Error fetching sales: {e}")
        return "An error occurred while fetching sales data.", 500
    finally:
        if "dbConnection" in locals():
            dbConnection.close()


@app.route("/all", methods=["GET"])
def all_data():
    try:
        dbConnection = db.connectDB()

        # Queries
        customers = db.query(dbConnection, "SELECT * FROM Customers;").fetchall()
        products = db.query(dbConnection, "SELECT * FROM Products;").fetchall()
        logistics = db.query(dbConnection, "SELECT * FROM Logistics;").fetchall()
        sales = db.query(dbConnection, "SELECT * FROM Sales;").fetchall()

        # For dropdowns
        customer_options = db.query(dbConnection, "SELECT customerID, firstName, lastName FROM Customers;").fetchall()
        couriers = db.query(dbConnection, "SELECT courierID, courierName FROM Logistics;").fetchall()
        product_options = db.query(dbConnection, "SELECT sku, productName FROM Products;").fetchall()

        return render_template(
            "all_data.j2",
            customers=customers,
            products=products,
            logistics=logistics,
            sales=sales,
            customer_options=customer_options,
            couriers=couriers,
            product_options=product_options
        )

    except Exception as e:
        print(f"Error fetching all data: {e}")
        return "An error occurred while fetching data for all tables.", 500
    finally:
        if "dbConnection" in locals():
            dbConnection.close()

# ########################################
# ########## LISTENER

if __name__ == "__main__":
    app.run(port=PORT, debug=True)
