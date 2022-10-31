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
*/

const whereAmI = async function (country) {
    await fetch(`https://restcountries.com/v2/name/${country}`);
}