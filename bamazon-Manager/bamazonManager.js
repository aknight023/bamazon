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
	console.log('You made a connection to the DB');
	managerSelection();
	
});


function viewAllProducts () {

	connection.query('Select * FROM products WHERE stock_quantity != 0', function(error, viewAllProductsRes) {
	if (error) throw error;

	console.table(viewAllProductsRes);
	managerSelection();
	});

	
}

function lowInventory () {
		connection.query('Select * FROM products WHERE stock_quantity < 5', function(error, lowInventoryRes) {
			if (error) throw error;
			
			if (lowInventoryRes === '[]') {
				console.table(lowInventoryRes);
			} else {
				console.log('No Low Inventory!')
			}	

			managerSelection();
		});

}

function addInventory () {

	connection.query('Select * FROM products WHERE stock_quantity != 0', function(error, addInventoryRes) {
		if (error) throw error;

		inquirer.prompt([{
			type: 'list',
			message: 'Select item where you would like to add more stock.\n',
			name: 'itemInventoryList',
			choices: function() {
				var choiceArr = [];
				for (i = 0; i < addInventoryRes.length; i++) {
					choiceArr.push(addInventoryRes[i].item_id + " : " + addInventoryRes[i].product_name + " : " + addInventoryRes[i].stock_quantity);
				}
				return choiceArr;
				}
			}, {
				type: 'input',
				name: 'stock_quantityAdd',
				message: 'How many units do you want to add?',
				filter: Number	
			}

		]).then(function(itemInventoryListResp,itemInventoryListerr ) {
				if (itemInventoryListerr) throw itemInventoryListerr;
				
				var selectionArr = itemInventoryListResp.itemInventoryList.split(" : ");
				
				addInventoryRes.forEach(function(row) {
					if ( parseInt(selectionArr[0]) == row.item_id) {

						var parms = [
						{
							stock_quantity: row.stock_quantity + parseInt(itemInventoryListResp.stock_quantityAdd)
						},
						{
							item_id: row.item_id
						}];	

						connection.query("UPDATE products SET ? WHERE ?", parms, function (error, updateresult) {
							if (error) throw error;

							console.log("Items added successfully!\n");

							console.log('You TOTAL stock for '+row.product_name+' is '+ parms[0].stock_quantity + '\n');
						    managerSelection();    
						});
					}
				});		

			});	
	
	});

}

function addNewProduct () {
	// Name the .name field the same so i can just place the reponse object as my parms
	inquirer.prompt([{
	    type: 'input',
	    message: '\nWhat is the name of this the new product?\n',
	    name: 'product_name'
	  },
	  {
	    type: 'list',
	    message: '\nWhat is the department of this the new product?\n',
	    choices: ['Grocery', 'Produce', 'Clothing', 'Pharmacy', 'Other'],
	    name: 'department_name'
	  },
	  {
	    type: 'input',
	    message: '\nWhat is the price per unit of the new product?\n',
	    name: 'price',
	    filter: Number,
	    validate: function(valueV) {
	      typeof(valueV);

	      if (valueV === 'NaN') {
	      	return false;
	      } else {
	      	return true;
	      }
	    }
	    
	  },
	  {
	    type: 'input',
	    message: '\nWhat is the starting stock quantity of this the new product?\n',
	    name: 'stock_quantity',
	    filter: Number,
  	}]).then(function(addNewProductRes) {

		connection.query('INSERT INTO products SET ?', addNewProductRes, function(error, addNewProductRes) {
			if (error) throw error;
			
			console.log('Products added successfully');
			managerSelection();
		});
	})

}



function managerSelection() {
  inquirer.prompt([{
    type: 'list',
    message: 'Select from list below what action you would like to complete.',
    choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit'],
    name: "managerSelection"
  }, ]).then(function(selectionResp) {
    switch (selectionResp.managerSelection) {
      case 'View Products for Sale':
        viewAllProducts();
        break;

      case 'View Low Inventory':
        lowInventory();
        break;

      case 'Add to Inventory':
        addInventory();
        break;

      case 'Add New Product':
        addNewProduct();
        break;
      case 'Exit':
      	connection.end();
      	break;
    }
  }).catch(function(error) {
    throw error;
  });
};