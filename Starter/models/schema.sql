DROP DATABASE IF EXISTS ra_db;

CREATE DATABASE ra_db;

USE ra_db;

CREATE TABLE solar_data(
start DATE,
end DATE,
peak DATE,
class VARCHAR(40)
);

SELECT * FROM solar_data;
SELECT * FROM moon_data;