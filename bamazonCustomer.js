
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
start();
});

function start() {
  connection.query("SELECT * FROM products", function(err, allResults) {
    // if (err) throw err;

    // console.log("this is the results " + JSON.stringify(allResults));
    inquirer
      .prompt([
        {
          name: "listItems",
          type: "rawlist",
          choices: () => allResults.map(item => `${item.product_name}........Qty: ${item.stock_quantity} `),
          message: "What would you like to buy, provide the ID # please:"
        },
        {
          name: "purchase",
          type: "input",
          message: "What quanity would you like to purchase:"
        }
      ])
      .then(function(userInput) {
        // console.log(userInput);
        let itemName = userInput.listItems.substr(0, userInput.listItems.indexOf("."));
        let quantNumber;
          console.log(itemName);
          // console.log(userInput.listItems);
          // if (err) throw err;
          connection.query(
            "SELECT * FROM  products WHERE ?",
            [
            {
              product_name: itemName
            }
            ], function (error, selectRow) {
              if (err) throw err;
              // console.log(selectRow);
              quantNumber = selectRow[0].stock_quantity;
              let itemPrice = selectRow[0].price;
            if (parseInt(userInput.purchase) > parseInt(quantNumber)) {
              console.log("Insufficnent Quantity! There are only " + quantNumber + " in stock.");

            } else {
              let newQuantity = (parseInt(quantNumber) - parseInt(userInput.purchase));
              let total = userInput.purchase * itemPrice
              let query = connection.query(
                "Update products SET ? WHERE ?",
                [
                {
                  stock_quantity: newQuantity
                },
                {
                  item_id: userInput.listItems
                }
                ], function(err, newProductData) {
                  if (err) throw err;
                  console.log(newProductData);
                  console.log("Your total Price is: " + "$" + total);
                })
            }
      });
    });
  })
};