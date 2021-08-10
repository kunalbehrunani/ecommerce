/*

E - C O M M E R C E  A P P  ( B A C K E N D )

Use promises to create a chain of events to be performed synchronously.

1. Input Cart Value and check if Inventory is available?
2. If yes, Check if enough Balance is available?
3. If yes, place the order and generate the order number. Hence, reduce the inventory, and user Balance.
4. Show the order items, totalOrderCost, updateBalance with Order number at last.

Additional Functionilties: 
1. Allow user to update Balance
2. Allow user to add items in Cart
3. Allow user to add items in inventory
*/

const inventory = {
  'Mobile' : {
    onHand : 5,
    cost : 5000
  },
  'Tablet' : {
    onHand : 30,
    cost : 7000
  },
  'Laptop' : {
    onHand : 10,
    cost : 10000
  }
};

const onRejected = (errorMessage) => {
  console.log('Failure!');
  console.log(`Error Message : ${errorMessage}`);
}

const generateRandomeOrderNumber = () => {
  return Math.floor(Math.random()*10000000);
}

const generateRandomTimeoutValue = () => {
  return Math.floor(Math.random()*5000);
}


//This method should input the cart array and check if all the items are available in the inventory. Return value should be a Promise object
const checkInventory = (cart,currentBalance) => {
  console.log('Checking Inventory...');
  return new Promise ((resolve,reject)=>{
    setTimeout( ()=>{
      console.log(cart);
      console.log(inventory);
        

      let stock;
      stock = cart.some(item => inventory[item[0]]);
      if(!stock) reject('All items in the cart are unavailable in inventory. Order cannot be placed. Kindly update the invetory');
      stock = cart.every( item => inventory[item[0]].onHand >= item[1] );
      if(stock){
        console.log('All items in the cart are available in inventory.');
        let totalOrderCost = 0;
        cart.forEach( item => {
          totalOrderCost += inventory[item[0]].cost * item[1];
        });
        console.log(`Total Order Cost : ${totalOrderCost}`);
        resolve([cart,totalOrderCost,currentBalance]);
      }else{
        reject('All items in the cart are unavailable in inventory. Order cannot be placed. Kindly update the invetory');
      }
    },generateRandomTimeoutValue())//End of setTimeout function
  }//End of executor Function for Promise Object
  )//End of Promise Object

}//End of checkInventory() Function


const checkBalance = (responseFromCheckInventory) => {
  console.log('Checking User Balance...');
  const cart = responseFromCheckInventory[0];
  const totalOrderCost = responseFromCheckInventory[1];
  const currentBalance = responseFromCheckInventory[2];
  return new Promise ( (resolve,reject)=>{
    setTimeout( ()=>{
      if(currentBalance > totalOrderCost){
        console.log('Current Balance amount eligible to place order.');
        resolve([cart,totalOrderCost,currentBalance]);
      }else{
        reject(`Current Balance insufficient to place order. You need to add ${totalOrderCost-currentBalance} more to your balance`);
      }
    }, generateRandomTimeoutValue() )//End of Timeout function
  }//End of executor Function inside Promise Object
  )//End of Promise Object

}//End of checkBalance() Function

const placeOrder = (responseFromCheckBalance) => {
    const cart = responseFromCheckBalance[0];
    const totalOrderCost = responseFromCheckBalance[1];
    let currentBalance = responseFromCheckBalance[2];
    console.log('Placing Order...');
    currentBalance -= totalOrderCost;
    console.log(`Order Placed.`);
    console.log(`Order Number: ${generateRandomeOrderNumber()}`);
    console.log(`Items:`);
    cart.forEach(item => {
      console.log(`Product Name: ${item[0]} | Quantity Ordered: ${item[1]} | perCost: ${inventory[item[0]].cost}`);
    });
    console.log(`Total Order Cost: ${totalOrderCost}`);
    console.log(`Remaining Balance: ${currentBalance}`);
    return [cart,totalOrderCost,currentBalance,generateRandomeOrderNumber()];
  }

/*
  const updateInventory = (productName,onHand,cost) => {
    inventory[productName].onHand = onHand;
    inventory[productName].cost = cost;
    console.log(`Updated Inventory - `);
    for(prop in inventory){
      console.log(`Product Name: ${prop} | OnHandQty: ${prop.onHand} | PerCost: ${prop.cost}`);
    }
  }
  */

module.exports = {
  checkBalance,
  checkInventory,
  placeOrder,
  onRejected
  //updateInventory
}







