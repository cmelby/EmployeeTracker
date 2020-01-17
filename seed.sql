

DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
 
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)

);


INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");

INSERT INTO role (title, salary, department_id)
VALUE ("Saleslead", 160000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 200000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Egineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Account Manager", 110000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 100000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Leagal Team Lead", 120000, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Chris", "Melby", NULL, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jake", "Snider", Null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Tiffany","Puterbaugh", NULL, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Arpil", "Larivee", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("John", "Doe", 2, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jason", "Armstrong", 3, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Nika", "Vlasco", 1, 7);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Gustavo", "Caue", 2, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Ellen", "Palmer", 3, 2);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
