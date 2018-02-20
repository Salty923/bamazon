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
                    console.log("Please select the item you would like to add to.");
                    showInventory();
                    break;
                case "Add new product?":
                    newProduct();
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

function showInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`#${res[i].id}:${res[i].product_name} $${res[i].price} ${res[i].stock_quanity} in stock.`);
        }
        chooseProduct();
    }); 
}



function chooseProduct() {
    inquirer
        .prompt({
            name: "choice",
            type: "input",
            message: "Please enter the # of the item you would like to stock.",
        })
        .then(function (answer) {
            selection = answer.choice -1;
            console.log(selection);
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                product = res[selection].product_name
                stock = res[selection].stock_quanity;
                price = res[selection].price;
                console.log(`You have selected ${product}`);
                console.log(`There are ${stock} in stock.`);
                addProduct();
            });
        }); 
}

function addProduct() {
    inquirer
        .prompt({
            name: "add",
            type: "input",
            message: "How many are you adding?"
        })
        .then(function (answer) {
           var addStock = +answer.add;
           stock += addStock;
           console.log(`You added ${addStock} to ${product}s!`);
           console.log(`Now there are now ${stock} ${product}s in stock.`);
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
               function (err, res) {
                   if (err) throw err;
                   connection.end();
               } 
           )
        })
}

function newProduct() {
    inquirer
        .prompt([
        {
            name: "product",
            type: "input",
            message: "What is the new product?"
        },
        {
            name: "department",
            type: "input",
            message: "What department will it be placed in?"
        },
        {
            name: "price",
            type: "input",
            message: "What does it cost?"
        },
        {
            name: "quanity",
            type: "input",
            message: "How many will be in stock??"
        },
        ]).then(function (answer){
            product = answer.product;
            var department = answer.department;
            price = answer.price;
            stock = answer.quanity;
            connection.query(
                "INSERT INTO products SET ?",
                    {
                        product_name: product,
                        department_name: department,
                        price: price,
                        stock_quanity: stock
                    },
                function(err, res) {
                    if (err) throw err;
                    console.log(`You have added ${stock} ${product}s.`);
                    connection.end();
                }
            )
        });
 }
    
            
        