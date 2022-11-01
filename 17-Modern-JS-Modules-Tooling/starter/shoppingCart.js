//Exporting module

console.log('Exporting module');

//Blocking code--makes code in script.js wait also

// console.log('start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/posts')

// console.log('finished fetching users');
const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
	cart.push({ product, quantity });
	console.log(`${quantity} ${product} added to cart`);
}

const totalPrice = 236
const totalQuantity = 23

export { totalPrice, totalQuantity as tq }
//Default exports

export default function (product, quantity) {
	cart.push({ product, quantity });
	console.log(`${quantity} ${product} added to cart`);
}

