DROP database if exists  Bamazon;
CREATE DATABASE Bamazon;
USE Bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Trash Bags', 'Grocery', 5.99, 300),
		('Paper Towels', 'Grocery', 4.25, 400),
        ('Soap', 'Grocery', 2.25, 200),
		('Apples', 'Produce', 0.35, 500),
		('Bannana', 'Produce', 0.20, 200),
		('Orange Juice', 'Grocery', 3.20, 150),
		('Milk', 'Grocery', 4.50, 200),
        ('12 Pack Soda', 'Grocery', 4.50, 200),					
		('White Shirt', 'Clothing', 10.00, 10),
		('Blue Shorts', 'Clothing', 15.00, 25),
		('Advil', 'Pharmacy', 4.00, 100),
		('Band Aids', 'Pharmacy', 3.25, 600),
		('Ice Cream', 'Grocery', 3.25, 225);
	

SELECT * FROM products;