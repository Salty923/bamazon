const mysql = require("mysql");
const inquirer = require("inquirer");



//Create connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) throw err;
});




start();


function start() {
    inquirer
        .prompt({
            name: "Start",
            type: "rawlist",
            message: "What would you like to do?",
            choices: ["View products for sale?", "View low inventory?",
             "Add to inventory?", "Add new product?"]
        })
        .then(function (answer) {
            switch (answer.Start) {
                case "View products for sale?":
                    console.log("Please see all of the inventory");
                    show();
                    break;
                case "View low inventory?":
                    console.log("Please see all low inventory");
                    showLow();
                    break;
                case "Add to inventory?":
                    console.log("What inventory would you like to add?");
                    break;
                case "Add new product?":
                    console.log("What new product would you like to add?");
                    break;
                default:
                console.log(`${answer.Start}`);
                    break;
            }
        }); 

} 


function show() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`#${res[i].id}:${res[i].product_name} $${res[i].price} ${res[i].stock_quanity} in stock.`);
        }
    }); connection.end();
}


function showLow(){
    connection.query(
        "SELECT * FROM products WHERE stock_quanity < 6", function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log(`#${res[i].id}:${res[i].product_name} $${res[i].price} ${res[i].stock_quanity} in stock.`);
            }
        }); connection.end();
}