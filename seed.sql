

DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE emolyee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name DECIMAL(30),
  role_id INT FOREIGN KEY,
  manager_id INT FOREIGN KEY,
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
  department_id INT FOREIGN KEY,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

INSERT INTO products ()
VALUES ();

INSERT INTO products ()
VALUES ();

INSERT INTO products ()
VALUES ();
