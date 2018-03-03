-- Create a database called 'Bamazon' and switch into it for this activity --
DROP database if exists  Bamazon;
CREATE DATABASE Bamazon;
USE Bamazon;

-- Create a table called 'products' which will contain the store inventory --
CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

-- Insert data into the 'products' table --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Trash Bags', 'Grocery', 5.99, 300),
		('Paper Towels', 'Grocery', 4.25, 400),
        ('Soap', 'Grocery', 2.25, 200),
		('Apples', 'Produce', 0.35, 500),
		('Bannana', 'Produce', 0.20, 200),
		('Orange Juice', 'Grocery', 3.45, 150),
		('Milk', 'Grocery', 4.50, 200),
        (' 12 Pack Soda', 'Grocery', 4.50, 200),					
		('White Shirt', 'Clothing', 5.55, 120),
		('Blue Shorts', 'Clothing', 17.88, 250),
		('Advil', 'Pharmacy', 4.95, 100),
		('Band Aids', 'Pharmacy', 3.25, 600),
		('Ice Cream', 'Grocery', 3.25, 225);
	
-- Run Query to view data in table
SELECT * FROM products;