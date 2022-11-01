//Importing module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js'
// addToCart('bread', 5)
console.log('Importing module');
// console.log(price, tq);

// import * as ShoppingCart from './shoppingCart.js'

// ShoppingCart.addToCart('bagels', 7)

// console.log(ShoppingCart.totalPrice);
//DONT MIX DEFAUL AND NAMED EXPORTS
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js'
import add, { cart } from './shoppingCart.js';

add('pizza', 2);
add('dog food', 7);
add('cds', 8);

console.log(cart);