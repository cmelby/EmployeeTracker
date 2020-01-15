//======== Dependencies===================//
const inquirer = require("inquirer")
const mysql = require("mysql")
const consoleTable = require("console.table")
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "employee_trackerDB"
  });

connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
});

// const table = cTable.getTable([
//     {
//       name: 'foo',
//       age: 10
//     }, {
//       name: 'bar',
//       age: 20
//     }
//   ]);
  
//   console.log(table);
  
  // prints
//   name  age
//   ----  ---
//   foo   10
//   bar   20

// function addDRE();


// function viewDRE();


// function updateEmployeeRole();