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
-- Create a table called productstable with the following properties:
-- pid - an auto incrementing integer which is the primary key
-- pName - a varchar of maximum length 50, cannot be null
-- price - decimal value with 5 precision before and 2 after decimal pt --http://www.java2s.com/Code/SQL/Table-Index/Createtablesmallintdecimalandfloat.htm
-- pSection - a varchar of maximum length 50, cannot be null
-- quantity - integer value for quantity of item
*/

CREATE TABLE `productstable` (
    `pid` int AUTO_INCREMENT PRIMARY KEY,
    `pName` varchar(50) NOT NULL,
    `price` decimal(5,2),
    `pSection` varchar(50) NOT NULL,
    `quantity` int
) ENGINE=InnoDB;
/*
-- insert the following into the products table:
-- pName - a varchar of maximum length 50, cannot be null
-- price - decimal value with 5 precision before and 2 after decimal pt --http://www.java2s.com/Code/SQL/Table-Index/Createtablesmallintdecimalandfloat.htm
-- pSection - a varchar of maximum length 50, cannot be null
-- quantity - integer value for quantity of item

-- pName - Teddy Bear
-- price - 10.50
-- pSection - toys
-- quantity - 50

-- pName - Dumplings pack of 24
-- price - 5.50
-- pSection - frozen foods
-- quantity - 35

-- pName - Laundry Basket
-- price - 12.75
-- pSection - Household goods
-- quantity - 15

-- pName - Pepsi 8 oz
-- price - .99
-- pSection - drinks
-- quantity - 5

-- pName - Lego Star Wars SET
-- price - 120.90
-- pSection - toys
-- quantity - 1

-- pName - Vintage Game of Thrones Pop Vinyl
-- price - 12.99
-- pSection - collectibles
-- quantity - 2
*/
INSERT INTO `productstable` (pName, price, pSection, quantity) VALUES ('Teddy Bear', '10.50', 'toys', '50'), ('Dumplings pack of 24', '5.50', 'frozen foods', '35'),
('Laundry Basket', '12.75', 'Household goods', '15'), ('Pepsi 8 oz', '.99', 'drinks', '5'), ('Lego Star Wars Set', '120.90', 'toys', '1'), ('Vintage Game of Thrones Pop Vinyl',
'12.99', 'collectibles', '2');
/*
-- Create a table called workers with the following properties:
-- wid - an auto incrementing integer which is the primary key
-- wFirstName - a varchar with a maximum length of 50 characters, cannot be null
-- wLastName - a varchar with a maximum length of 50 characters, cannot be null
-- job - a varchar of maximum length 50, cannot be null
-- email - a varchar of maximum length 50, cannot be null
-- birthday - a date day/month/year
-- location - a varchar of maximum length 50, cannot be null
*/
CREATE TABLE `workers` (
    `wid` int AUTO_INCREMENT PRIMARY KEY,
    `wFirstName` varchar(50) NOT NULL,
    `wLastName` varchar(50) NOT NULL,
    `job` varchar(50) NOT NULL,
    `email` varchar(50) NOT NULL,
    `birthday` DATE,
    `location` varchar(50) NOT NULL
) ENGINE=InnoDB;

/*
-- insert the following into the workers table
-- wFirstName - a varchar with a maximum length of 50 characters, cannot be null
-- wLastName - a varchar with a maximum length of 50 characters, cannot be null
-- job - a varchar of maximum length 50, cannot be null
-- email - a varchar of maximum length 50, cannot be null
-- birthday - a date day/month/year
-- location - a varchar of maximum length 50, cannot be null

-- wFirstName - Fred
-- wLastName - Smith
-- job - Cashier
-- email - fred.smith@yahoo.com
-- birthday - 04/1/1975
-- location - San Francisco

-- wFirstName - Kenneth
-- wLastName - Chang
-- job - Stocker
-- email - ken.chang@hotmail.com
-- birthday - 23/3/1996
-- location - Orlando

-- wFirstName - Mike
-- wLastName - Rodriguez
-- job - cashier
-- email - m.rodriguez@gmail.com
-- birthday - 06/6/1989
-- location - Boston

-- wFirstName - Sally
-- wLastName - Benedict
-- job - stocker
-- email - sally.benedict@gmail.com
-- birthday - 02/5/1979
-- location - Los Angeles

-- wFirstName - Lisa
-- wLastName - Jordan
-- job - cashier
-- email - lisa.jordan@sbcglobal.net
-- birthday - 27/7/1965
-- location - Brooklyn
*/
INSERT INTO `workers` (wFirstName, wLastName, job, email, birthday, location) VALUES ('Fred', 'Smith', 'Cashier', 'fred.smith@yahoo.com', '04/1/1975', 'San Francisco'),
('Kenneth', 'Chang', 'Stocker', 'ken.chang@hotmail.com', '23/3/1996', 'Orlando'), ('Mike', 'Rodriguez', 'Cashier', 'm.rodriguez@gmail.com', '06/6/1989', 'Boston'),
('Sally', 'Benedict', 'Stocker', 'sally.benedict@gmail.com', '02/5/1979', 'Los Angeles'), ('Lisa', 'Jordan', 'Cashier', 'lisa.jordan@sbcglobal.net', '27/7/1965', 'Brooklyn');

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
-- insert the following into sections table:
-- sname - a varchar of maximum length 50, cannot be null
-- sname - Toys, collectibles, drinks, Household goods, frozen foods
*/
INSERT INTO `sections` (sname) VALUES ('Toys'), ('collectibles'), ('drinks'), ('Household goods'), ('frozen foods');

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
-- insert the following into the locations table:
-- city - a varchar of maximum length 50, cannot be null
-- city - Brooklyn, Boston, San Francisco, Los Angeles, Orlando
*/
INSERT INTO `locations` (city) VALUES ('Brooklyn'), ('Boston'), ('San Francisco'), ('Los Angeles'), ('Orlando');

/*
-- Create a table called customer_product with the following properties, this is a table representing a many-to-many relationship
-- between customerstable and productstable,
-- customer_id - an integer which is a foreign key reference to customerstable cid
-- product_id - an integer which is a foreign key reference to productstable pid
-- The primary key is a combination of customer_id and product_id
*/
CREATE TABLE `customer_product` (
    `customer_id` int PRIMARY KEY,
    `product_id` int,
    KEY `customer_id` (`customer_id`),
    FOREIGN KEY (`customer_id`) REFERENCES `customerstable`(`cid`) ON DELETE CASCADE ON UPDATE CASCADE,
    KEY `product_id` (`product_id`),
    FOREIGN KEY (`product_id`) REFERENCES `productstable`(`pid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

SET FOREIGN_KEY_CHECKS = 1;
