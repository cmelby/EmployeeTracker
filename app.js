//======== Dependencies===================//
const inquirer = require("inquirer")
const mysql = require("mysql")
const consoleTable = require("console.table")
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_trackerDB"
  });


//========== Connection ID ==========================//
connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    startPrompt();
});

//================== Initial Prompt =======================//
function startPrompt() {
    inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: ["Add Employee?",
              "Add Role?",
              "Add Department?",
              "View All Employees?", 
              "View All Roles?",
              "View all Deparments", 
              "Update Employee"
            ]
    }
]).then(function(val) {
        switch (val.choice) {
            case "Add Employee?":
                addEmployee();
              break;
      
            case "Add Role?":
                addRole();
              break;
      
            case "Add Department?":
                addDepartment();
              break;
      
            case "View All Employees?":
                viewAllEmployees();
              break;
      
            case "View All Roles?":
                viewAllRoles();
              break;
            case "View all Deparments":
                viewAllDepartments();
              break;
            case "Update Employee":
                updateEmployee();
              break;
            }
    })
}


//============= Add Employee ==========================//
function addEmployee() { 

  connection.query("SELECT * FROM employee", function(err, results) {
    if (err) throw err;
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter their first name "
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter their last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is their role? ",
          choices: selectRole(),
        },
        {
            name: "choice",
            type: "rawlist",
            choices: selectManager(),
            message: "Whats their managers name?"
        }
    ]).then(function(val) {
      var roleId;
      var managerId;
      for (var i = 0; val.length; i++) {
        if (results[i] === val.role) {
          roleId = results[i]
        } else if (results[i] === val.choice) {
          managerId = results[i]
        }
        // return roleId && managerId; 
        console.log(roleId);
        console.log(managerId);
      }

       connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: val.firstname,
              last_name: val.lastname,
              // manager_id: val.choice,
              // role_id: val.titleId
              
            },
            function(err) {
                if (err) throw err
                console.log("You just added an employee");
                startPrompt();
            }
        )   
    });
  });
}
//================= Select Role Quieries Role Title for Add Employee Prompt ===========//
function selectRole() {
  var roleArr = [];
  connection.query("SELECT title, id FROM role", function(err, res) {
    console.log(res)
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  })
  return roleArr;
}
//================= Select Role Quieries The Managers for Add Employee Prompt ===========//
function selectManager() {
  var managersArr = [];
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    console.log(res)
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }

  })
  return managersArr;
}

//============= Add Employee Role ==========================//
function addRole() { 
    inquirer.prompt([
        {
          name: "title",
          type: "input",
          message: "What is the roles Title?"
        },
        {
          name: "salary",
          type: "input",
          message: "What is the Salary?"

        } 
    ]).then(function(answer) {
        connection.query(
            "INSERT INTO role SET ?",
            {
              title: answer.title,
              salary: answer.salary,
            },
            function(err) {
                if (err) throw err
                console.log("You just added a role");
                startPrompt();
            }
        )

    });
 
  }
//============= Add Department ==========================//
function addDepartment() { 
    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(answer) {
        var query = connection.query(
            "INSERT INTO department SET ?",
            {
              name: answer.name
            
            },
            function(err) {
                if (err) throw err
                console.log("You just added a department");
                startPrompt();
            }
        )
  
    });
 
  }
//============= View All Employees ==========================//
    function viewAllEmployees() {
      connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id", 
      function(err, res) {
        if (err) throw err
    console.log(res);
       
    }).then(function(err, res) {
      if (err) throw err
     employeeTable = printTable(res);
    
    })
    return employeeTable;
  }
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
// function readEmployeeItems(cb) {
//     connection.query("SELECT * FROM employee ", function(err, res) {
//         if (err) throw err;
//         cb(res);
//     })
// }
//Role table.............
// function readRoleItems(cb) {
//     connection.query("SELECT * FROM role ", function(err, res) {
//         if (err) throw err;
//         cb(res);
//     })
// }
//Role table.............
// function readDepartments(cb) {
//     connection.query("SELECT * FROM department ", function(err, res) {
//         if (err) throw err;
//         cb(res);
//     })
// }



function printTable(res) {
  var viewTable = cTable.getTable([{res}])
  return viewTable;
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



