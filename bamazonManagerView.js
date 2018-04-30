var mysql =  require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"

});

connection.connect(function(err){
  if (err) throw err;
  console.log("connected as id" + connection.threadId + "\n");
managerView();
});

function managerView() { 
  connection.query("SELECT * FROM products",
  function(err, masterResults) {
    if (err) throw err;
    // console.log(masterResults);

    inquirer
      .prompt([
        {
          name: "options",
          type: "rawlist",
          message: "What would you like:",
          choices:[
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "End"
          ]
        }
      ])
      .then(function(answer) {
        switch (answer.options) {
          case "View Products for Sale":
          viewProducts(managerView);
          break;

          case "lowInv":
          lowInv();
          break;

          case "addInv":
          addInv();
          break;

          case "addProduct":
          addProduct();
          break;

          case "End":
          end();
          break;
        }
        // console.log(answer.action); 
      })
      function viewProducts() {
        connection.query("SELECT * FROM products", function(err, allResults) {
          if (err) throw err;
          console.log(allResults);

          allResults
          .map(item => 
            `ID: ${allResults.item_id}
          ---- Name: ${allResults.product_name}***** Department: ${allResults.department_name} 
          -----Price:${allResults.price}
          +++++Quantity: ${allResults.stock_quantity}`)
        })
      };

      // function lowInv

      // function addInv

      // function addProduct

      // function end

      //   })
      // }
  })
 }