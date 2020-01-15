

DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE emolyee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name DECIMAL(30),
  manager_id INT
  FOREIGN KEY (role_id) REFERENCES role(id)
  FOREIGN KEY (employee_id) REFERENCES employee(id)

);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30),
 
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

INSERT INTO products ()
VALUES ();

INSERT INTO products ()
VALUES ();

INSERT INTO products ()
VALUES ();
