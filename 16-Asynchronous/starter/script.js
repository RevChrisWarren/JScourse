'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const renderCountry = function (data, className = '') {
    const html = ` <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}
const request = fetch(`https://restcountries.com/v2/name/portugal`)

// console.log(request);
const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    // countriesContainer.style.opacity = 1
}

///////////////////////////////////////

/*
const getCountryData = function (country) {
 
 
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v2/name/${country}`);
    request.send();
 
    request.addEventListener('load', function () {
        // console.log(this.responseText);
        const [data] = JSON.parse(this.responseText)
        console.log(data);
        const html = ` <article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;
        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1;
    });
};
 
getCountryData('Portugal');
 
 
const renderCountry = function (data, className = '') {
    const html = ` <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}
 
const getCountryAndNeighbor = function (country) {
 
    //AJAX call country 1
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v2/name/${country}`);
    request.send();
 
    request.addEventListener('load', function () {
        // console.log(this.responseText);
        const [data] = JSON.parse(this.responseText)
        // console.log(data);
        //render country 1 
        renderCountry(data)
 
        //get neighbor country
        const [neighbor] = data.borders
        if (!neighbor) return
        //AJAX call country 2
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
        request2.send();
        request2.addEventListener('load', function () {
            // console.log(this.responseText);
            const data2 = JSON.parse(this.responseText)
            renderCountry(data2, 'neighbour')
        });
    });
};
 
getCountryAndNeighbor('china');
 
setTimeout(() => {
    console.log('One second passed');
    setTimeout(() => {
        console.log('Two seconds passed');
        setTimeout(() => {
            console.log('Three seconds passed');
            setTimeout(() => {
                console.log('Four seconds passed');
                setTimeout(() => {
                    console.log('Five seconds passed');
                }, 1000)
            }, 1000)
        }, 1000)
    }, 1000)
}, 1000)
 
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();
 
 
const getJSON = function (url, errorMsg = 'Something went wrong...') {
    return fetch(url).then(response => {
        if (!response.ok)
            throw new Error(`${errorMsg}, (${response.status})`)
        return response.json()
    })
};
 
// const getCountryData = function (country) {
//     //Country 1
//     fetch(`https://restcountries.com/v2/name/${country}`)
//         .then(response => {
//             console.log(response);
 
//             if (!response.ok)
//                 throw new Error(`Country not found(${response.status})`)
//             return response.json()
//         })
//         .then(data => {
//             renderCountry(data[0]);
//             const neighbor = data[0].borders[0];
//             if (!neighbor) return;
//             //Country 2 RETURN SO YOU CAN HANDLE OUTSIDE THE PREVIOUS .THEN FUNCTION
//             return fetch(`https://restcountries.com/v2/alpha/${neighbor}`)
//         })
//         .then(response => {
//             if (!response.ok)
//                 throw new Error(`Country not found(${response.status})`)
//             return response.json()
//         })
//         .then(data => renderCountry(data, 'neighbour'))
//         .catch(err => {
//             console.error(`${err}💥💥💥`);
//             renderError(`Something Went Wrong💥💥 ${err.message}. Try Again!`);
//         })
//         .finally(() => {
//             countriesContainer.style.opacity = 1
//         })
// }
// btn.addEventListener('click', function () {
//     getCountryData('usa')
// });
const getCountryData = function (country) {
    // Country 1
    getJSON(
        `https://restcountries.com/v2/name/${country}`,
        'Country not found'
    )
        .then(data => {
            renderCountry(data[0]);
            const neighbour = data[0].borders[0];
            if (!neighbour) throw new Error('No neighbour found!');
            //Country 2 RETURN SO YOU CAN HANDLE OUTSIDE THE PREVIOUS .THEN FUNCTION
 
            return getJSON(
                `https://restcountries.com/v2/alpha/${neighbour}`,
                'Country not Found'
            );
        })
        .then(data => renderCountry(data, 'neighbour'))
        .catch(err => {
            console.error(`${err}💥💥💥`);
            renderError(`Something Went Wrong💥💥 ${err.message}. Try Again!`);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1
        });
};
btn.addEventListener('click', function () {
    getCountryData('portugal')
});
 
// // const getCountryData = function (country) {
//     //Country 1
//     fetch(`https://restcountries.com/v2/name/${country}`)
//         .then(response => {
//             console.log(response);
 
//             if (!response.ok)
//                 throw new Error(`Country not found(${response.status})`)
//             return response.json()
//         })
//         .then(data => {
//             renderCountry(data[0]);
//             const neighbor = data[0].borders[0];
//             if (!neighbor) return;
const api = '1b92b52d7f624582a42a78a29c528f45'
const whereAmI = function (lat, lon) {
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${api}`)
 
        .then(response =>
            response.json())
        .then(result => {
            console.log(result)
            const country = result.features[0].properties.country
            const city = result.features[0].properties.city
            console.log(`You are in ${city}, ${country}`)
 
            getCountryData(country)
            if (!country) throw new Error(`Country not found ${error.message}`)
 
        })
        .catch(err => console.err(`${err.message}  🔴 Something went wrong!`))
 
 
    // console.log(country)
 
}
 
whereAmI(-33.933, 18.474
)
 
 
console.log('Test start');
setTimeout(() => console.log('0 second timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
 
Promise.resolve('Resolved promise 2').then(res => {
    for (let i = 0; i < 1000000000; i++) { }
    console.log(res)
});
 
console.log('test end');
 
 
const lotteryPromise = new Promise(function (resolve, reject) {
    console.log('Lottery Ticket purchased...');
    setTimeout(function () {
        if (Math.random() >= .5) {
            //Marks promise as fulfilled promise
            resolve('You WIN 😀')
        } else {
            reject(new Error('Sorry, you lost your money 😔'))
        }
    }, 2000)
});
 
lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));
 
//Promisifying setTimeout
 
const wait = function (seconds) {
    return new Promise(function (resolve, _) {
        setTimeout(resolve, seconds * 1000);
    })
};
 
wait(1).then(() => {
    console.log('1 Second passed')
    return wait(1);
}).then(() => {
    console.log('2 Seconds passed')
    return wait(1);
}).then(() => {
    console.log('3 Seconds passed')
    return wait(1);
}).then(() => {
    console.log('4 Seconds passed')
    return wait(1);
}).then(() => console.log('5 Seconds passed'));
 
// setTimeout(() => {
//     console.log('One second passed');
//     setTimeout(() => {
//         console.log('Two seconds passed');
//         setTimeout(() => {
//             console.log('Three seconds passed');
//             setTimeout(() => {
//                 console.log('Four seconds passed');
//                 setTimeout(() => {
//                     console.log('Five seconds passed');
//                 }, 1000)
//             }, 1000)
//         }, 1000)
//     }, 1000)
// }, 1000)
 
Promise.resolve('abc').then(res => console.log('resolved'))
Promise.reject(new Error('def')).catch(rej => console.error('rejected'))
 
 
// navigator.geolocation.getCurrentPosition(position => console.log(position), err => console.log(err)
// );
// console.log('getting position');
 
const getPosition = function () {
    return new Promise(function (resolve, reject) {
        // navigator.geolocation.getCurrentPosition(position => resolve(position), err => reject(err)
        navigator.geolocation.getCurrentPosition(resolve, reject)
 
    });
};
const api = '1b92b52d7f624582a42a78a29c528f45'
getPosition().then(pos => console.log(pos))
    .catch(err => console.log(err));
const whereAmI2 = function () {
    getPosition().then(pos => {
        const { latitude, longitude } = pos.coords
        return fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${api}`)
    }).then(res => {
        if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
        return res.json()
    }).then(data => {
        console.log(data);
        const country = data.features[0].properties.country
        console.log(country);
        const city = data.features[0].properties.city
        console.log(city);
        console.log(`You are in ${city}, ${country}`);
 
        return fetch(`https://restcountries.com/v2/name/${country}`)
 
    }).then(response => {
        console.log(response);
 
        if (!response.ok)
            throw new Error(`Country not found(${response.status})`)
 
        return response.json()
 
    }).then(data => renderCountry(data[0]))
        .catch(err => console.error(`${err.message}`))
}
 
btn.addEventListener('click', whereAmI2)
 
const api = '1b92b52d7f624582a42a78a29c528f45'
const getPosition = function () {
    return new Promise(function (resolve, reject) {
        // navigator.geolocation.getCurrentPosition(position => resolve(position), err => reject(err)
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}
const whereAmI = async function () {
    try {
        const pos = await getPosition();
        const { latitude: lat, longitude: lng } = pos.coords;
        const geocoding = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${api}`)
        if (!geocoding.ok) throw new Error('Problem getting location data')
        const dataGeo = await geocoding.json();
        // console.log(dataGeo);
 
        const country = dataGeo.features[0].properties.country
        const res = await fetch(`https://restcountries.com/v2/name/${country}`);
        // console.log(res);
        if (!res.ok) throw new Error('Problem getting country')
        const data = await res.json();
        // console.log(data);
        renderCountry(data[0]);
        return `You are in ${dataGeo.features[0].properties.city}, ${dataGeo.features[0].properties.country}`
    } catch (err) {
        console.error(`${err}`)
        renderError(`Something Went Wrong 💥 ${err.message}`);
    }
}
 
console.log('1: will get location');
// const city = whereAmI();
// // console.log(city);
// whereAmI().then(city => console.log(`2 ${city}`)).catch(err => console.error(err))
//     .finally(() => console.log('3: Finished getting location'));
(async function () {
    try {
        const city = await whereAmI();
        console.log(`2: ${city}`)
    } catch (err) {
        console.error(`2: ${err.message}`)
    }
    console.log('3: Finished getting location')
 
})();
// try {
//     let y = 1;
//     const x = 2;
//     y = 3
// } catch (err) {
//     alert(err.message)
// }
 
const getJSON = function (url, errorMsg = 'Something went wrong...') {
    return fetch(url).then(response => {
        if (!response.ok)
            throw new Error(`${errorMsg}, (${response.status})`)
        return response.json()
    })
};
 
// const get3Countries = async function (c1, c2, c3) {
//     try {
//         const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`)
//         const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`)
//         const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`)
//         console.log([data1.capital, data2.capital, data3.capital])
//     } catch (err) {
//         console.error(`${err.message}`)
//     }
// }
 
//RUNNING ASYNC FUNCTIONS IN PARALLEL
const get3Countries = async function (c1, c2, c3) {
    try {
        const data = await Promise.all([getJSON(`https://restcountries.com/v2/name/${c1}`), getJSON(`https://restcountries.com/v2/name/${c2}`), getJSON(`https://restcountries.com/v2/name/${c3}`)])
        console.log(data.map(d => d[0].capital));
    } catch (err) {
        console.error(`${err.message}`)
    }
}
get3Countries('germany', 'usa', 'russia')
 

//Promise.race --receives array of promises and returns an array
const getJSON = function (url, errorMsg = 'Something went wrong...') {
    return fetch(url).then(response => {
        if (!response.ok)
            throw new Error(`${errorMsg}, (${response.status})`)
        return response.json()
    })
};
(async function () {
    const res = await Promise.race([
        getJSON(`https://restcountries.com/v2/name/italy`),
        getJSON(`https://restcountries.com/v2/name/egypt`),
        getJSON(`https://restcountries.com/v2/name/mexico`),
    ]);
    console.log(res[0]);
})();

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error('request took too long'))
        }, s)
    })
}

Promise.race([
    getJSON(`https://restcountries.com/v2/name/mexico`),
    timeout(1),
]).then(res => console.log(res[0]))
    .catch(err => console.log(err))

//Promise.allSettled

Promise.allSettled([
    Promise.resolve('Success'),
    Promise.resolve('Success'),
    Promise.reject('error'),
    Promise.resolve('Success'),
    Promise.resolve('Success'),
]).then(res => console.log(res))
    .catch(err => console.log(err));

Promise.any([
    Promise.reject('error'),
    Promise.reject('error'),
    Promise.reject('error'),
    Promise.reject('error'),
    Promise.resolve('Success'),
    Promise.resolve('Success'),
    Promise.reject('error'),
    Promise.resolve('Success'),
    Promise.resolve('Success'),
]).then(res => console.log(res))
    .catch(err => console.log(err));
*/


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


const loadNPause = async function () {
    try {
        let img = await createImage('img/img-1.jpg')

        console.log('image one loaded');
        await wait(2)

        img.style.display = 'none'
        img = await createImage('img/img-2.jpg')

        console.log('image two loaded');
        await wait(2)

        img.style.display = 'none'

    } catch (err) { console.error(`${err.message}`) }
}
// loadNPause()

const imgArr = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']

const loadAll = async function (arr) {
    try {
        const imgs = imgArr.map(async img => await createImage(img))
        console.log(imgs);

        const imgEls = await Promise.all(imgs)
        console.log(imgEls);
        imgEls.forEach(img => img.classList.add('parallel'));
    }
    catch (err) { console.log(err) }
}
loadAll(imgArr)