//Creating it as an Array of Arrays because we know that every element of cart is to be processed. Can also be declared as an Object or Array of Objects etc but the functionalities of array will be useful. 

const { checkInventory, 
        checkBalance, 
        placeOrder, 
        onRejected
        // updateInventory
        } = require('./myLibrary.js');

const myCart = [
  ['Mobile',5],
  ['Tablet', 3],
  ['Laptop', 7],
  ['TV', 2]
];

const myBalance = 216000;

checkInventory(myCart,myBalance).then(checkBalance,onRejected).then(placeOrder,onRejected);
/*
setTimeout(()=>{
  console.log('Updating Inventory');
  updateInventory('TV',5,50000);
  checkInventory(myCart,myBalance).then(checkBalance,onRejected).then(placeOrder,onRejected);
},10000)
*/
