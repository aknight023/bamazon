# BAMazon

### Overview
A Node.js and MySQL CLI digital storefront.

### Node.js
 Two JavaScript files replicate the basics of a simple ecommerce CLI engine:

- `BamazonCustomer.js` 
  - Receives orders from customers via the command line and update mySQL db to display stock from the store's inventory.

- `BamazonManager.js` 
  - Mimics the basics of a warehouse management system, providing managers with a list of options to view stock and adjust inventory.
  - A sample of the menu is below:
    * View Products for Sale 
    * View Low Inventory
    * Add to Inventory
    * Add New Product

### MySQL
The JavaScript files mentioned above query a MySQL database called `Bamazon` which is locally hosted.

- Please refer to the `Bamazonsql.sql` file to see how the database was created using raw SQL queries.

### Node Package Manager (npm)
If you clone this repo down to your machine, note that it has three npm dependencies!
Before running the JavaScript files mentioned above, please run `npm install` in your terminal.

You will need to create a `.env` file in BamazonCustomer and BamazonManager directory to hold environment variables
```
# Database connections
DB_HOST=localhost
DB_USER=Replace with user name of db
DB_PASS=Replace with password of db
```

### Screenshots
Below are some screenshots that show the functionality of the app.

#### Customer

- Below are screenshoots for the `BamazonCustomer.js` file.
  - Running `node BamazonCustomer.js` will use MySQL to pull up all the products for sale.
    - The customer can then choose a product using its ID, then enter a quantity to buy. Says if the item was bought with the total price.
      ![Customer Order](images/customer1.png)
    - As you see the trashbag stock was update. If the inventory is lacking product, the order will not be processed.
      ![Order Invalid](images/customer2.png)

#### Manager

- Below is a demo of the `BamazonManager.js` file...
  - Running `node BamazonManager.js` will display a menu and perform the specific requests.
    ![Manager Menu](/example_images/BamazonManager-0.png)
    - The manager can choose option `1` to view the current inventory.
      ![Manager 1](/example_images/BamazonManager-1.png)
    - The manager can choose option `2` to see low items in inventory (less than 5 in stock).
      ![Manager 2](/example_images/BamazonManager-2.png)
    - The manager can choose option `3` to re-stock existing items.
      ![Manager 3](/example_images/BamazonManager-3.png)
    - The manager can choose option `4` to add new items for sale.
      ![Manager 4a](/example_images/BamazonManager-4a.png)
      - Notice how the inventory was adjusted from steps `3` and `4`.
        ![Manager 4b](/example_images/BamazonManager-4b.png)
