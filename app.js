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
              "View All Employee's By Roles?",
              "View all Emplyees By Deparments", 
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
      
            case "View All Employee's By Roles?":
                viewAllRoles();
              break;
            case "View all Emplyees By Deparments":
                viewAllDepartments();
              break;
            case "Update Employee":
                updateEmployee();
              break;
            }
    })
}
//============= View All Employees ==========================//
function viewAllEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
    
  })

}
//============= View All Roles ==========================//
function viewAllRoles() {
  connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
  function(err, res) {
  if (err) throw err
  console.table(res)
  startPrompt()
  })

}
//============= View All Employees By Departments ==========================//
function viewAllDepartments() {
  connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
  })

}

//================= Select Role Quieries Role Title for Add Employee Prompt ===========//
var roleArr = [];
function selectRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    // console.log(res)
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  })
  return roleArr;
}
//================= Select Role Quieries The Managers for Add Employee Prompt ===========//
var managersArr = [];
function selectManager() {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    // console.log(res)
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }

  })
  return managersArr;
}
//============= Add Employee ==========================//
function addEmployee() { 
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
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: selectManager()
           
        }
    ]).then(function (answers) {
      var roleId = selectRole().indexOf(answers.role) + 1
      var managerId = selectManager().indexOf(answers.choice) + 1
      connection.query("INSERT INTO employee SET ?", {
          first_name: answers.firstName,
          last_name: answers.lastName,
          manager_id: managerId,
          role_id: roleId
      }, function(err){
          if (err) throw err
          console.table(answers)
          startPrompt()
      })

  })
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
    ]).then(function(res) {
        connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.title,
              salary: res.salary,
            },
            function(err) {
                if (err) throw err
                console.table(res);
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
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ?",
            {
              name: res.name
            
            },
            function(err, res) {
                if (err) throw err
                console.table(res);
                startPrompt();
            }
        )
  
    });
 
  }
//================= Select Role Quieries The Managers for Add Employee Prompt ===========//
// var updateRoleArr = [];
// function updateRole() {
//   connection.query("SELECT * FROM role", function(err, res) {
//     if (err) throw err
//     console.log(res)
//     for (var i = 0; i < res.length; i++) {
//       updateRoleArr.push(res[i].role_id);
//     }

//   })
//   return updateRoleArr;
// }
//================= Select Role Quieries The Managers for Add Employee Prompt ===========//
// var updateEmployeeArr = [];
// function updateEmployee() {
//   connection.query("SELECT frist_name FROM employee", function(err, res) {
//     if (err) throw err
//     console.log(res)
//     for (var i = 0; i < res.length; i++) {
//       updateEmployeeArr.push(res[i].first_name);
//     }

//   })
//   return updateEmployeeArr;
// }
//============= Update Employee ==========================//
  function updateEmployee() {
    connection.query("SELECT employee.first_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, results) {
      if (err) throw err
    inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: "What is the Employee's name? ",
            choices: 
          },
          {
            name: "newRole",
            type: "rawlist",
            message: "What is the Employees new title? ",
            choices: 
          },
      ]).then(function (answers) {
        var newRoleId = selectRole().indexOf(answers.newRole) + 1
        connection.query("UPDATE employee SET ? WHERE ?", 
        {
            first_name: answers.firstName
           
        }, 
        {
            role_id: newRoleId
           
        }, 
        function(err){
            if (err) throw err
            console.table(answers)
            startPrompt()
        })
  
    });
  });

  }
  
  