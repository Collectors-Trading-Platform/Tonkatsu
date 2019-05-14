/*--Team Tonkatsu
--Jason Lim
--Kimberly Tom
--5/6/19
--Project Step 3
--https://stackoverflow.com/questions/8434518/mysql-foreign-key-constraint-is-incorrectly-formed-error help in regards to better understanding primary + foreign key relation
--Data Definition Queries
-- For part one of this assignment you are to make a database with the following specifications and run the following queries
-- Table creation queries should immediately follow the drop table queries, this is to facilitate testing on my end
*/

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `customer_product`;
DROP TABLE IF EXISTS `customerstable`;
DROP TABLE IF EXISTS `productstable`;
DROP TABLE IF EXISTS `workers`;
DROP TABLE IF EXISTS `sections`;
DROP TABLE IF EXISTS `locations`;

/*
-- Create a table called sections with the following properties:
-- sid - an auto incrementing integer which is the primary key
-- sname - a varchar of maximum length 50, cannot be null
*/

CREATE TABLE `sections` (
    `sid` int AUTO_INCREMENT PRIMARY KEY,
    `sname` varchar(50) NOT NULL
) ENGINE=InnoDB;

/*
-- Create a table called customerstable with the following properties:
-- cid - an auto incrementing integer which is the primary key
-- cFirstName - a varchar with a maximum length of 50 characters, cannot be null
-- cLastName - a varchar with a maximum length of 50 characters, cannot be null
-- gender - a varchar with a maximum length of 50 characters, cannot be null
-- hometown - a varchar with max length of 50, cannot be null
*/

CREATE TABLE `customerstable` (
    `cid` int AUTO_INCREMENT PRIMARY KEY,
    `cFirstName` varchar(50) NOT NULL,
    `cLastName` varchar(50) NOT NULL,
    `gender` varchar(50) NOT NULL,
    `hometown` varchar(50) NOT NULL
) ENGINE=InnoDB;

/*
-- Create a table called productstable with the following properties:
-- pid - an auto incrementing integer which is the primary key
-- pName - a varchar of maximum length 50, cannot be null
-- price - decimal value with 5 precision before and 2 after decimal pt --http://www.java2s.com/Code/SQL/Table-Index/Createtablesmallintdecimalandfloat.htm
-- pSection - an int which is a foreign key that references sid from sections
-- quantity - integer value for quantity of item
*/

CREATE TABLE `productstable` (
    `pid` int AUTO_INCREMENT PRIMARY KEY,
    `pName` varchar(50) NOT NULL,
    `price` decimal(5,2),
    `pSection` int NOT NULL,
    `quantity` int,
	 FOREIGN KEY (`pSection`) REFERENCES sections(`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


/*
-- Create a table called customer_product with the following properties, this is a table representing a many-to-many relationship
-- between customerstable and productstable,
-- customer_id - an integer which is a foreign key reference to customerstable cid
-- product_id - an integer which is a foreign key reference to productstable pid
*/

CREATE TABLE `customer_product` (
    `customer_id` int,
    `product_id` int,
	FOREIGN KEY (`customer_id`) REFERENCES  `customerstable`(`cid`) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (`product_id`) REFERENCES `productstable`(`pid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

/*
-- Create a table called locations with the following properties:
-- lid - an auto incrementing integer which is the primary key
-- city - a varchar of maximum length 50, cannot be null
*/

CREATE TABLE `locations` (
    `lid` int AUTO_INCREMENT PRIMARY KEY,
    `city` varchar(50) NOT NULL
    ) ENGINE=InnoDB;

/*
-- Create a table called workers with the following properties:
-- wid - an auto incrementing integer which is the primary key
-- wFirstName - a varchar with a maximum length of 50 characters, cannot be null
-- wLastName - a varchar with a maximum length of 50 characters, cannot be null
-- job - a varchar of maximum length 50, cannot be null
-- email - a varchar of maximum length 50, cannot be null
-- birthday - a date day/month/year
-- location - an int which is a foreign key that references lid from locations
-- wSection - an int which is a foreign key that references sid from sections
*/

CREATE TABLE `workers` (
    `wid` int AUTO_INCREMENT PRIMARY KEY,
    `wFirstName` varchar(50) NOT NULL,
    `wLastName` varchar(50) NOT NULL,
    `job` varchar(50) NOT NULL,
    `email` varchar(50) NOT NULL,
    `birthday` DATE NOT NULL,
    `location` int NOT NULL,
	`wSection` int NOT NULL,
	 FOREIGN KEY (`location`) REFERENCES locations(`lid`) ON DELETE CASCADE ON UPDATE CASCADE,
	 FOREIGN KEY (`wSection`) REFERENCES sections(`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;




/* insertions */

/*
-- insert the following into sections table:
-- sname - a varchar of maximum length 50, cannot be null
-- sname - Toys, Collectibles, Srinks, Household Goods, Frozen Foods, Checkout
*/

INSERT INTO `sections` (sname) VALUES ('Toys'), ('Collectibles'), ('Drinks'), ('Household Goods'), ('Frozen Foods'), ('Checkout');


/*
-- insert the following into the customers table
-- cid - an auto incrementing integer which is the primary key
-- cFirstName - a varchar with a maximum length of 50 characters, cannot be null
-- cLastName - a varchar with a maximum length of 50 characters, cannot be null
-- gender - boolean value for male or female (0 is female, 1 is male)
-- hometown - a varchar with max length of 50, cannot be null
-- cFirstName: Jansen
-- cLastName: Douglas
-- gender: Male
-- hometown: Orlando
-- cFirstName: Elizabeth
-- cLastName: Franklin
-- gender: Female
-- hometown: Boston
-- cFirstName: Joseph
-- cLastName: McLaughlin
-- gender: Male
-- hometown: Brooklyn
-- cFirstName: Kacy
-- cLastName: Wong
-- gender: Female
-- hometown: San Francisco
-- cFirstName: Derrick
-- cLastName: Gonzalez
-- gender: Male
-- hometown: Los Angeles
*/

INSERT INTO `customerstable` (cFirstName, cLastName, gender, hometown) VALUES ('Jansen', 'Douglas', 'Male', 'Orlando'), ('Elizabeth', 'Franklin', 'Female', 'Boston'),
('Joseph', 'McLaughlin', 'Male', 'Brooklyn'), ('Kacy', 'Wong', 'Female', 'San Francisco'), ('Derrick', 'Gonzalez', 'Male', 'Los Angeles');

/*
-- insert the following into the products table:
-- pName - a varchar of maximum length 50, cannot be null
-- price - decimal value with 5 precision before and 2 after decimal pt --http://www.java2s.com/Code/SQL/Table-Index/Createtablesmallintdecimalandfloat.htm
-- pSection - an integer that references sid from sections
-- quantity - integer value for quantity of item
-- pName - Teddy Bear
-- price - 10.50
-- pSection - Toys
-- quantity - 50

-- pName - Dumplings pack of 24
-- price - 5.50
-- pSection - Frozen Foods
-- quantity - 35

-- pName - Laundry Basket
-- price - 12.75
-- pSection - Household Goods
-- quantity - 15

-- pName - Pepsi 8 oz
-- price - .99
-- pSection - Drinks
-- quantity - 5

-- pName - Lego Star Wars SET
-- price - 120.90
-- pSection - Toys
-- quantity - 1

-- pName - Vintage Game of Thrones Pop Vinyl
-- price - 12.99
-- pSection - Collectibles
-- quantity - 2
*/

INSERT INTO `productstable` (pName, price, pSection, quantity) VALUES 
('Teddy Bear', '10.50', (select sid from sections where sname = 'Toys'), '50'), 
('Dumplings pack of 24', '5.50',(select sid from sections where sname = 'Frozen Foods'), '35'),
('Laundry Basket', '12.75', (select sid from sections where sname = 'Household Goods'), '15'), 
('Pepsi 8 oz', '.99', (select sid from sections where sname = 'Drinks'), '5'), 
('Lego Star Wars Set', '120.90', (select sid from sections where sname = 'Toys'), '1'), 
('Vintage Game of Thrones Pop Vinyl', '12.99', (select sid from sections where sname = 'Collectibles'), '2');




/*
-- insert the following into the customer_product table:
*/

INSERT INTO customer_product (customer_id, product_id) VALUES ((select cid from customerstable where cFirstName = "Derrick" && cLastName = "Gonzalez"), (select pid from productstable where pName = "Laundry Basket"));
INSERT INTO customer_product (customer_id, product_id) VALUES ((select cid from customerstable where cFirstName = "Joseph" && cLastName = "McLaughlin"), (select pid from productstable where pName = "Lego Star Wars Set"));
INSERT INTO customer_product (customer_id, product_id) VALUES ((select cid from customerstable where cFirstName = "Elizabeth" && cLastName = "Franklin"), (select pid from productstable where pName = "Pepsi 8 oz"));
INSERT INTO customer_product (customer_id, product_id) VALUES ((select cid from customerstable where cFirstName = "Elizabeth" && cLastName = "Franklin"), (select pid from productstable where pName = "Teddy Bear"));
INSERT INTO customer_product (customer_id, product_id) VALUES ((select cid from customerstable where cFirstName = "Joseph" && cLastName = "McLaughlin"), (select pid from productstable where pName = "Lego Star Wars Set"));
INSERT INTO customer_product (customer_id, product_id) VALUES ((select cid from customerstable where cFirstName = "Elizabeth" && cLastName = "Franklin"), (select pid from productstable where pName = "Pepsi 8 oz"));


/*
-- insert the following into the locations table:
-- city - a varchar of maximum length 50, cannot be null
-- city - Brooklyn, Boston, San Francisco, Los Angeles, Orlando
*/

INSERT INTO `locations` (city) VALUES ('Brooklyn'), ('Boston'), ('San Francisco'), ('Los Angeles'), ('Orlando');


/*
-- insert the following into the workers table
-- wFirstName - a varchar with a maximum length of 50 characters, cannot be null
-- wLastName - a varchar with a maximum length of 50 characters, cannot be null
-- job - a varchar of maximum length 50, cannot be null
-- email - a varchar of maximum length 50, cannot be null
-- birthday - a date day/month/year
-- location - a varchar of maximum length 50, cannot be null
-- wSection - an int that references sid from sections

-- wFirstName - Fred
-- wLastName - Smith
-- job - Cashier
-- email - fred.smith@yahoo.com
-- birthday - 04/1/1975
-- location - San Francisco
-- wSection - Checkout


-- wFirstName - Kenneth
-- wLastName - Chang
-- job - Stocker
-- email - ken.chang@hotmail.com
-- birthday - 23/3/1996
-- location - Orlando
-- wSection - Toys

-- wFirstName - Mike
-- wLastName - Rodriguez
-- job - Cashier
-- email - m.rodriguez@gmail.com
-- birthday - 06/6/1989
-- location - Boston
-- wSection - Checkout

-- wFirstName - Sally
-- wLastName - Benedict
-- job - Stocker
-- email - sally.benedict@gmail.com
-- birthday - 02/5/1979
-- location - Los Angeles
-- wSection - Household Goods


-- wFirstName - Lisa
-- wLastName - Jordan
-- job - Stocker
-- email - lisa.jordan@sbcglobal.net
-- birthday - 27/7/1965
-- location - Brooklyn
-- wSection - Frozen Foods
*/

INSERT INTO `workers` (wFirstName, wLastName, job, email, birthday, location, wSection) VALUES 
('Fred', 'Smith', 'Cashier', 'fred.smith@yahoo.com', '1975-04-01', (select lid from locations where city = 'San Francisco'), (select sid from sections where sname = "Checkout")),
('Kenneth', 'Chang', 'Stocker', 'ken.chang@hotmail.com', '1996-03-23', (select lid from locations where city = 'Orlando'), (select sid from sections where sname = "Toys")), 
('Mike', 'Rodriguez', 'Cashier', 'm.rodriguez@gmail.com', '1989-06-06', (select lid from locations where city = 'Boston'), (select sid from sections where sname = "Checkout")),
('Sally', 'Benedict', 'Stocker', 'sally.benedict@gmail.com', '1979-02-05', (select lid from locations where city = 'Los Angeles'), (select sid from sections where sname = "Household Goods")), 
('Lisa', 'Jordan', 'Stocker', 'lisa.jordan@sbcglobal.net', '1965-07-27', (select lid from locations where city = 'Brooklyn'), (select sid from sections where sname = "Frozen Foods"));



SET FOREIGN_KEY_CHECKS = 1;
