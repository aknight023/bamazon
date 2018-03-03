require('dotenv').config();
var mysql = require ('mysql');
var inquirer = require('inquirer');
const cTable = require('console.table');


var connection = mysql.createConnection({

	host: process.env.DB_HOST,
	port: 3306,

	// user name and pw with dotenv variables
	user: process.env.DB_USER,
	password: process.env.DB_PASS,

	database: 'Bamazon',


});

connection.connect(function (err) {
	// body...
	if (err) throw err;

	console.log('Connection as id ' + connection.threadId);
	console.log('You made a connection to the DB');
	main();
	connection.end();
});

function main() { 

	connection.query('Select * FROM products WHERE stock_quantity != 0', function (err, responseTable) {

		if (err) throw err;
		// Used the console.table to create a view in the console	
		console.table(responseTable);
		
		inquirer.prompt([
			{
				type: 'input',
				name: 'item_id',
				message: 'What is the ID of the product you would like to buy',
				filter: Number
			}, 
			{
				type: 'input',
				name: 'stock_quantity',
				message: 'How many units do you want to buy?',
				filter: Number			
			}

		]).then(function(inputresponse) {
	    	
	    	responseTable.forEach(function(row) {

	    		// && parseInt(row.stock_quantity) > parseInt(inputresponse.stock_quantity)
	    		if (row.item_id === inputresponse.item_id ) { 

	    			console.log('match');
	    			var parms = [
	    			{
	    				stock_quantity: row.stock_quantity - inputresponse.stock_quantity
	    			},
	    			{
	    				item_id: row.item_id
	    			}];
	    			console.log(parms[0].stock_quantity);

	    			connection.query("UPDATE products SET ? WHERE ?", parms, function (error, updateresult) {
						if (error) throw error;
						console.log(updateresult.affectedRows + " record(s) updated");
						console.log("Items bought successfully!");
						// Total cost of products
						console.log('You total cost of sale for '+row.product_name+'is $ '+ row.stock_quantity * row.price);		             
		            });   			
		           
	    		} 	    		

	    	});



		});

	});// close connection
}
