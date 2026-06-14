CREATE DATABASE artea_portal;

USE artea_portal;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255),
  role VARCHAR(50)
);
