const mysql = require("mysql");
const inquirer = require("inquirer");



//Create connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bamazon'
});



start();


function start() {
    inquirer
        .prompt({
            name: "Start",
            type: "rawlist",
            message: "Are you ready to shop at Bamazon??",
            choices: ["Yes", "No"]
        })
        .then(function (answer) {
            if (answer.Start.toUpperCase() === "NO") {
                start();
            }
            else {
                console.log("Great! Please see out inventory below.");
                inventory();
            }
        });

}


function inventory() {
    console.log("Showing all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`${res[i].id}:${res[i].product_name} $${res[i].price} ${res[i].stock_quanity} in stock.`);
        }
        purchase();
    });
}

function purchase(){
    inquirer
        .prompt({
            name: "buy",
            type: "input",
            message: "Please enter the number of the item you would like to purchase.",
        })
        .then(function (answer) {
            var selection = answer.buy;
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                console.log(`You have selected ${res[selection].product_name}`);
            connection.end();
            });
            
        });
}

