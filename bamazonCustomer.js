const mysql = require("mysql");
const inquirer = require("inquirer");

var selection;
var stock;
var price;
var product;

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
            message: "Are you ready to shop at Bamazon??",
            choices: ["Yes", "No"]
        })
        .then(function (answer) {
            if (answer.Start.toUpperCase() === "NO") {
                start();
            }
            else {
                console.log("Great! Please see out inventory below.");
                shop();
            }
        });

}


function shop() {
    console.log("Showing all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`#${res[i].id}:${res[i].product_name} $${res[i].price} ${res[i].stock_quanity} in stock.`);
        }
        purchase();
    });
}

function purchase(){
    inquirer
        .prompt({
            name: "buy",
            type: "input",
            message: "Please enter the # of the item you would like to purchase.",
        })
        .then(function (answer) {
            selection = answer.buy-1;
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                product = res[selection].product_name
                stock = res[selection].stock_quanity;
                price = res[selection].price;
                console.log(`You have selected ${product}`);
                console.log(`There are ${stock} in stock and each cost $${price}.`);
                quanity();
            
            });
           
        });
}


function quanity(){
    inquirer
        .prompt({
            name: "amount",
            type: "input",
            message: "How many would you like to purchase?",
        })
        .then(function (answer) {
            var amount = answer.amount;
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                if (stock === 0) {
                    console.log(`Sorry, we do not have any ${product} left in stock.`)
                }else if (amount > stock) {
                    console.log(`Sorry, we only have ${stock} ${product}s remaining. `)
                }else{
                    stock -= amount;
                    updateStock();
                    console.log(`Please pay $${price * amount}.`);
                }
                connection.end();
                start();
            });

        });
}

function updateStock(){
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quanity: stock
            },
            {
                product_name: product
            }
        ],
        function(err,res) {
            if (err) throw err;
        }
    )
}

