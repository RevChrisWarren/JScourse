//Exporting module

console.log('Exporting module');
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

console.log(cart);