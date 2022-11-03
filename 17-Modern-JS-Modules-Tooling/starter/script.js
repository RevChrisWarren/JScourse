//Importing module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js'
// addToCart('bread', 5)
/*
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

//TOP LEVEL AWAIT in modules you can use await outside an async function

// const res = await fetch('https://jsonplaceholder.typicode.com/posts')
// const data = await res.json()
// console.log(data);

// //The await will slow down this console.log b/c it's outside the async function
// console.log('something');

const getLastPost = async function () {
	const res = await fetch('https://jsonplaceholder.typicode.com/posts')
	const data = await res.json()

	//Returns promise, not data
	return { title: data.at(-1).title, text: data.at(-1).body }
}

const lastPost = getLastPost()

console.log(lastPost);
//Not very clean
lastPost.then(res => console.log(res))

// Better syntax 
const lastPost2 = await getLastPost()
console.log(lastPost2);



const ShoppingCart2 = (function () {
	const cart = [];
	const shippingCost = 10;
	const totalPrice = 237;
	const totalQuantity = 24;
	const addToCart = function (product, quantity) {
		cart.push({ product, quantity });
		console.log(`${quantity} ${product} added to cart(shipping cost is ${shippingCost})`);
	}
	const orderStock = function (product, quantity) {
		console.log(`${quantity} ${product} ordered from supplier`);
	};
	return {
		addToCart,
		cart,
		totalPrice,
		totalQuantity
	}
})();

ShoppingCart2.addToCart('apple', 4)
ShoppingCart2.addToCart('pizza', 2)

console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost);
*/
