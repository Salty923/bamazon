DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(8,2) NOT NULL,
    stock_quanity INT(10) NOT NULL,
    PRIMARY KEY(id)
);



INSERT INTO products(product_name, department_name, price, stock_quanity)
VALUES ("Football", "Sporting Goods", 23.99, 7), ("Minions", "Movies", 19.99, 8),
("Coloring Book", "Books", 3, 2),("Stereo", "Audio", 125, 3),("Barbie", "Toys", 6, 10),
("Sledgehammer", "Tools", 17, 5),("Baseball", "Sporting Goods", 8, 30),
("Tent", "Sporting Goods", 175, 3),("Advil", "Pharmacy", 8.50, 15),
("Socks", "Clothing", 10.99, 28);



