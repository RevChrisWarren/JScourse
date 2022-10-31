'use strict';
const imgContainer = document.querySelector('.images')


const createImage = function (imgPath) {
	return new Promise(function (resolve, reject) {
		const img = document.createElement('img')
		img.src = imgPath

		img.addEventListener('load', function () {
			imgContainer.append(img)
			resolve(img)
		})
		img.addEventListener('error', function () {
			reject(new Error('Image not found'))
		});
	});
};

const wait = function (seconds) {
	return new Promise(function (resolve, _) {
		setTimeout(resolve, seconds * 1000);
	})
};
let currentImg;

createImage('img/img-1.jpg')
	.then(img => {
		currentImg = img;
		console.log('image one loaded');
		return wait(2)
	})
	.then(() => {
		currentImg.style.display = 'none'
		return createImage('img/img-2.jpg')
	}).then(img => {
		currentImg = img;
		console.log('image two loaded');
		return wait(2)
	}).then(() => {
		currentImg.style.display = 'none'
	})
	.catch(err => console.log(err))

// wait(2).then(() => {
// 	imgContainer.style.display = 'none'
// }).then(() => {
// 	imgContainer.textContent = '';
// 	createImage('img/img-2.jpg')
// 	imgContainer.style.display = 'block'
// }).then(() => wait(2))
// 	.then(() => {
// 		imgContainer.style.display = 'none'
// 	})