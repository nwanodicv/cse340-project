/* ===============================
   1. DROP EXISTING OBJECTS
   (Allows rebuild without errors)
   =============================== */

DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS classification;
DROP TABLE IF EXISTS account;
DROP TYPE IF EXISTS account_type;


/* ===============================
   2. CREATE ENUM TYPE
   =============================== */

CREATE TYPE account_type AS ENUM ('Client', 'Employee', 'Admin');


/* ===============================
   3. CREATE TABLES
   =============================== */

CREATE TABLE account (
  account_id SERIAL PRIMARY KEY,
  account_firstname VARCHAR(50) NOT NULL,
  account_lastname VARCHAR(50) NOT NULL,
  account_email VARCHAR(100) UNIQUE NOT NULL,
  account_password VARCHAR(255) NOT NULL,
  account_type account_type DEFAULT 'Client'
);


CREATE TABLE classification (
  classification_id SERIAL PRIMARY KEY,
  classification_name VARCHAR(50) NOT NULL
);


CREATE TABLE inventory (
  inv_id SERIAL PRIMARY KEY,
  inv_make VARCHAR(50) NOT NULL,
  inv_model VARCHAR(50) NOT NULL,
  inv_year INT NOT NULL,
  inv_description TEXT NOT NULL,
  inv_image VARCHAR(255),
  inv_thumbnail VARCHAR(255),
  inv_price NUMERIC(10,2),
  inv_miles INT,
  inv_color VARCHAR(50),
  classification_id INT NOT NULL,
  CONSTRAINT fk_classification
    FOREIGN KEY (classification_id)
    REFERENCES classification (classification_id)
);


/* ===============================
   4. INSERT CLASSIFICATION DATA
   =============================== */

INSERT INTO classification (classification_name)
VALUES
('Sport'),
('SUV'),
('Truck'),
('Sedan'),
('Custom');


/* ===============================
   5. INSERT INVENTORY DATA
   (Example rows – use your course data)
   =============================== */

INSERT INTO inventory (
  inv_make,
  inv_model,
  inv_year,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_miles,
  inv_color,
  classification_id
)
VALUES
-- SPORT (1)
('Chevy', 'Camaro', 2018, 'Sporty muscle car', '/images/camaro.jpg', '/images/camaro-tn.jpg', 35000, 15000, 'Black', 1),
('Ford', 'Mustang', 2019, 'Iconic sport vehicle', '/images/mustang.jpg', '/images/mustang-tn.jpg', 37000, 12000, 'Blue', 1),

-- SUV (2)
('GM', 'Hummer', 2008, 'large SUV with small interiors', '/images/hummer.jpg', '/images/hummer-tn.jpg', 26000, 50000, 'Black', 2),

-- TRUCK (3)
('Ford', 'F-150', 2020, 'Powerful and reliable truck', '/images/f150.jpg', '/images/f150-tn.jpg', 40000, 20000, 'White', 3),

-- SEDAN (4)
('Toyota', 'Camry', 2021, 'Comfortable family sedan', '/images/camry.jpg', '/images/camry-tn.jpg', 28000, 10000, 'Silver', 4),

-- CUSTOM (5)
('Custom', 'adventador', 2015, 'Unique custom built vehicle', '/images/adventador.jpg', '/images/adventador-tn.jpg', 50000, 8000, 'Red', 5),
('Custom', 'aerocar', 2015, 'Unique custom built vehicle', '/images/aerocar.jpg', '/images/aerocar-tn.jpg', 50000, 8000, 'Red', 5),
('Custom', 'batmobile', 2015, 'Unique custom built vehicle', '/images/batmobile.jpg', '/images/batmobile-tn.jpg', 50000, 8000, 'Red', 5),
('Custom', 'camaro', 2015, 'Unique custom built vehicle', '/images/camaro.jpg', '/images/camaro-tn.jpg', 50000, 8000, 'Red', 5),
('Custom', 'crwn-vic', 2015, 'Unique custom built vehicle', '/images/crwn-vic.jpg', '/images/crwn-vic-tn.jpg', 50000, 8000, 'Red', 5),
('Custom', 'delorean', 2015, 'Unique custom built vehicle', '/images/delorean.jpg', '/images/delorean-tn.jpg', 50000, 8000, 'Red', 5),
('Custom', 'dog-car', 2015, 'Unique custom built vehicle', '/images/dog-car.jpg', '/images/dog-car-tn.jpg', 50000, 8000, 'Red', 5),
('Custom', 'escalade', 2015, 'Unique custom built vehicle', '/images/escalade.jpg', '/images/escalade-tn.jpg', 50000, 8000, 'Red', 5),
('Custom', 'fire-truck', 2015, 'Unique custom built vehicle', '/images/fire-truck.jpg', '/images/fire-truck-tn.jpg', 50000, 8000, 'Red', 5),
('Custom', 'hummer', 2015, 'Unique custom built vehicle', '/images/hummer.jpg', '/images/hummer-tn.jpg', 50000, 8000, 'Red', 5),
('Custom', 'mechanic', 2015, 'Unique custom built vehicle', '/images/mechanic.jpg', '/images/mechanic-tn.jpg', 50000, 8000, 'Red', 5),
('Custom', 'model-t', 2015, 'Unique custom built vehicle', '/images/model-t.jpg', '/images/model-t-tn.jpg', 50000, 8000, 'Red', 5),
('Custom', 'monster-truck', 2015, 'Unique custom built vehicle', '/images/monster-truck.jpg', '/images/monster-truck-tn.jpg', 50000, 8000, 'Red', 5),
('Custom', 'mystery-van', 2015, 'Unique custom built vehicle', '/images/mystery-van.jpg', '/images/mystery-van-tn.jpg', 50000, 8000, 'Red', 5),
('Custom', 'no-image', 2015, 'Unique custom built vehicle', '/images/no-image.png', '/images/no-image-tn.png', 50000, 8000, 'Red', 5),
('Custom', 'survan', 2015, 'Unique custom built vehicle', '/images/survan.jpg', '/images/survan-tn.jpg', 50000, 8000, 'Red', 5),
('Custom', 'wrangler', 2015, 'Unique custom built vehicle', '/images/wrangler.jpg', '/images/wrangler-tn.jpg', 50000, 8000, 'Red', 5),

/* ====================================================
   6. ASSIGNMENT 2 QUERY #4
   UPDATE HUMMER DESCRIPTION
   ==================================================== */

UPDATE inventory
SET inv_description =
REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM'
AND inv_model = 'Hummer';


/* ====================================================
   7. ASSIGNMENT 2 QUERY #6
   UPDATE IMAGE PATHS
   ==================================================== */

UPDATE inventory
SET
inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');