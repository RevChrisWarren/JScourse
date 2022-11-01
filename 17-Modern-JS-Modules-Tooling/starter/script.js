//Importing module
import { addToCart, totalPrice as price, totalQuantity } from './shoppingCart.js'

console.log('Importing module');

addToCart('bread', 5)
console.log(price, totalQuantity);