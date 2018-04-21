
var mysql =  require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"

});

connection.connect(function(err){
  if (err) throw err;
console.log("connected as id" + connection.threadId);
afterConnection()
});

function afterConnection() {
  connection.query("SELECT * FROM products", function
(err, res){
  if (err) throw err;
  console.log(res);
  inquirer.prompt([/* Pass your questions in here */{
    name: "bid",
    type: "input",
    message: "How much would you like to bid?"
  }]).then(answers => {
    console.log(answers);
// Use user feedback for... whatever!!
});
  
});
}