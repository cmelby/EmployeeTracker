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


//========== Connection ID ==========================//
connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    // startPrompt();
});

//================== Initial Prompt =======================//
// function startPrompt() {
//     inquirer.prompt([
//     {
//     type: "list",
//     message: "What would you like to do?",
//     name: "choice",
//     choices: ["Add Employee?",
//               "Add Role?",
//               "Add Department?",
//               "View All Employees?", 
//               "View All Roles?",
//               "View all Deparments", 
//               "Update Employee"
//             ]
//     }
// ]).then(function(val) {
//         if (val.choices === "Add Employee?") {
//             addEmployee();
//         } else if (val.choices === "Add Role?") {
//             addRole();
//         } else if (val.choices === "Add Department?") {
//             addDepartment();
//         } else if (val.choices === "View All Employees?") {
//             viewAllEmployees();
//         } else if (val.choices === "View All Roles?") {
//             viewAllRoles();
//         } else if (val.choices === "View all Deparments") {
//             viewAllDepartments();
//         } else if (val.choices === "Update Employee") {
//             updateEmployee();
//         }
//         // switch (answer.choice) {
//         //     case "Add Employee?":
//         //         addEmployee();
//         //       break;
      
//         //     case "Add Role?":
//         //         addRole();
//         //       break;
      
//         //     case "Add Department?":
//         //         addDepartment();
//         //       break;
      
//         //     case "View All Employees?":
//         //         viewAllEmployees();
//         //       break;
      
//         //     case "View All Roles?":
//         //         viewAllRoles();
//         //       break;
//         //     case "View all Deparments":
//         //         viewAllDepartments();
//         //       break;
//         //     case "Update Employee":
//         //         updateEmployee();
//         //       break;
//         //     }
//     })
// }
addEmployee();
//============= Add Employee ==========================//
function addEmployee() { 
    inquirer.prompt([
        {
          name: "first name",
          type: "input",
          message: "Enter their first name "
        },
        {
          name: "last name",
          type: "input",
          message: "Enter their last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is their role? "
        },
        {
          name: "manager",
          type: "list",
          message: "Who is thier manager?",
        }
    ]).then(function(answer) {
        var query = connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer.item,
              last_name: answer.item,
              role: answer.item,
              manager: answer.item
            },
            function(err) {
                if (err) throw err
                console.log("You just added an employee");
                startPrompt();
            }
        )
        
    });
 
  }
//============= Add Employee By Role ==========================//
// function addRole() { 
//     inquirer.prompt([
//         {
//           name: "title",
//           type: "input",
//           message: "What is the roles Title?"
//         },
//         {
//           name: "salary",
//           type: "input",
//           message: "What is the Salary?"

//         } 
//     ]).then(function(answer) {
//         var query = connection.query(
//             "INSERT INTO role SET ?",
//             {
//               title: answer.item,
//               salary: answer.item,
//             },
//             function(err) {
//                 if (err) throw err
//                 console.log("You just added a role");
//                 startPrompt();
//             }
//         )

//     });
 
//   }
//============= Add Department ==========================//
// function addDepartment() { 
//     inquirer.prompt([
//         {
//           name: "name",
//           type: "input",
//           message: "What Department would you like to add?"
//         }
//     ]).then(function(answer) {
//         var query = connection.query(
//             "INSERT INTO department SET ?",
//             {
//               name: answer.item
            
//             },
//             function(err) {
//                 if (err) throw err
//                 console.log("You just added a department");
//                 startPrompt();
//             }
//         )
  
//     });
 
//   }
//============= View All Employees ==========================//
    // function viewAllEmployees(){
    //     readEmployeeItems().then(
    //         function(err) {
    //             if (err) throw err
    //             console.log("You just added an employee");
    //             startPrompt();
    //         }
    //     )
       
    // }

//============= View Employees By Department ==========================//
//  function viewAllRoles() {
//     readRoleItems().then(
//         function(err) {
//             if (err) throw err
//             console.log("You just added an employee");
//             startPrompt();
//         }
//     )
   
// }
//============= View Employees By Department ==========================//
// function viewAllDepartments() {
//     readDepartments().then(
//         function(err) {
//             if (err) throw err
//             console.log("You just added an employee");
//             startPrompt();
//         }
//     )
   
// }

  //============= Update Employee ==========================//
//   function updateEmployee() {
//       inquirer.prompt([
//           {
//             name: "updateEmployee",
//             type: "input",
//             message: "What "
//           }
//       ])
//     console.log("Updating employees...\n");
//     var query = connection.query(
//       "UPDATE role SET ? WHERE ?",
//       [
//         {
//           title: "Seinor Engineer"
//         },
//         {
//           salary: 90000,
//         }
//       ],
//       function(err, res) {
//         console.log(res.affectedRows + " employee updated!\n");

//       }
//     );
//   }

//================ Read Items =================================//
//Employee Table...........
function readEmployeeItems(cb) {
    connection.query("SELECT * FROM employee ", function(err, res) {
        if (err) throw err;
        cb(res);
    })
}
//Role table.............
function readRoleItems(cb) {
    connection.query("SELECT * FROM role ", function(err, res) {
        if (err) throw err;
        cb(res);
    })
}
//Role table.............
function readDepartments(cb) {
    connection.query("SELECT * FROM department ", function(err, res) {
        if (err) throw err;
        cb(res);
    })
}







// const employeeTable = cTable.getTable([
//     {
//       name: 'foo',
//       age: 10
//     }, {
//       name: 'bar',
//       age: 20
//     }
//   ]);
  
//   console.log(employeeTable);

// const roleTable = cTable.getTable([
//     {
//       name: 'foo',
//       age: 10
//     }, {
//       name: 'bar',
//       age: 20
//     }
//   ]);
  
//   console.log(roleTable);

// const departmentTable = cTable.getTable([
//     {
//       name: 'foo',
//       age: 10
//     }, {
//       name: 'bar',
//       age: 20
//     }
//   ]);
  
//   console.log(departmentTable);


