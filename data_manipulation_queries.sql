/*--Team Tonkatsu
--Jason Lim
--Kimberly Tom
--5/6/19
--Project Step 3
--Data Manipulation Queries
--colon is user input https://www.ibm.com/support/knowledgecenter/en/SSEPGG_11.1.0/com.ibm.db2.luw.apdv.embed.doc/doc/t0005862.html
*/

-- Customers:
-- Add new Customer:
INSERT INTO `customerstable` (cFirstName, cLastName, gender, hometown)
VALUES (:cFirstName, :cLastName, :gender, :hometown);
-- Find Customers by ID:
SELECT * FROM customerstable WHERE CID=:cid;

-- Find Customers by name: 
SELECT * FROM customerstable WHERE cFirstName = :firstname AND cLastName = :lastname;

-- Find Customers by gender: 
SELECT * FROM customerstable WHERE gender = :gender;

-- Update Customer information
UPDATE customerstable SET cFirstName= :fnamenew, cLastName = :lastnamenew, gender = :gendernew, hometown = :townIDnew
WHERE customerstable.id = :customerIDinput;

-- Remove Customer:
DELETE FROM customerstable WHERE CID = :cid;


--Products
-- Add a new product
INSERT INTO productstable (pName, price, pSection, quantity) VALUES (:pName, :price, :pSection, :quantity);

-- find product by name
SELECT * FROM productstable WHERE pName = :pName;

-- find product by price
SELECT * FROM productstable WHERE price = :price;

-- find product by section
SELECT * FROM productstable WHERE pSection = :pSection;

-- find product by quantity
SELECT * FROM productstable WHERE quantity = :quantity;

-- Update product information
UPDATE productstable SET pName = :pNamenew, price = :pricenew, pSection = :sectionnew, quantity = :quantitynew
WHERE productstable.id = :productIDinput;

-- Remove products
DELETE FROM productstable WHERE PID=:pid;

--Workers
-- Add a new worker
INSERT INTO workers (wFirstName, wLastName, job, email, birthday, location) VALUES (:wFirstName, :wLastName, :job, :email, :birthday, :location);

-- find worker by first name
SELECT * FROM workers WHERE wFirstName = :wFirstName;

-- find worker by last name
SELECT * FROM workers WHERE wLastName = :wLastName;

-- find worker by job title
SELECT * FROM workers WHERE job = :job;

-- find worker by email address
SELECT * FROM workers WHERE email = :email;

-- find worker by birthday
SELECT * FROM workers WHERE birthday = :birthday;

-- find worker by location
SELECT * FROM workers WHERE location = :location;

-- Update workers information
UPDATE workers SET wFirstName = :newfirstname, wLastName = :newlastname, job = :newjob, email = :newemail, birthday = :newbirthday, location = :newlocation
WHERE workers.id = :workersIDinput;

-- Remove workers
DELETE FROM workers WHERE WID=:wid;

-- Sections
-- Add condition:
INSERT INTO sections (sid, sname)
VALUES (:sid, :sname);

-- Search by section name
SELECT * FROM sections WHERE sname = :sn;

-- Update sections information
UPDATE sections SET sname = :newsectionname
WHERE sections.id = :sectionsIDinput;

-- Remove sections
DELETE FROM sections WHERE SID=:sid;


-- Locations
-- Add a location:
INSERT INTO locations (lid, city)
VALUES (:lid, :city);

-- Search by city
SELECT * FROM locations WHERE city = :city;

-- Search by location id
SELECT * FROM locations WHERE lid = :lid;

-- Update locations information
UPDATE locations SET city = :newcity
WHERE locations.id = :locationsIDinput;

-- Delete locations
DELETE FROM locations WHERE lid = :lid;


-- Display info Queries
-- Display all customers
SELECT cid, cFirstname, cLastname, gender, hometown FROM customerstable

-- Display the price of all items
select pName, price from productstable

-- Display the customers' purchases
SELECT cFirstname, cLastname, pName as productPurchased FROM customerstable as c 
INNER JOIN customer_product as cp on c.cid = cp.customer_id
INNER JOIN productstable as p on cp.product_id = p.pid

-- Display the number of items each custmer purchased
SELECT cFirstname, cLastname, Count(product_id) as itemsPurchased FROM customerstable as c 
INNER JOIN customer_product as cp on c.cid = cp.customer_id
GROUP BY cFirstName
