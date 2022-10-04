// Remember, we're gonna use strict mode in all scripts now!
'use strict';
/*
const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];


//Given temperatures, calculate amplitude
//amplitude = difference between highest and lowest amounts
// how to compute max and min temps?
//what is a sensor error, and what to do when it occurs?
// first, ignore sensor errors
// find max value
// find min value
// subtract min from max
// return that

const calcTempAmplitude = function (temps) {
    let max = temps[0];
    let min = temps[0];
    for (let i = 0; i < temps.length; i++) {
        const curTemp = temps[i]

        if (typeof curTemp !== 'number') continue;
        if (curTemp > max) max = curTemp;
        if (curTemp < min) min = curTemp;
    }
    console.log(max, min);

    return max - min;
}

const amplitude = calcTempAmplitude(temperatures)
console.log(amplitude)
//What if the function should now receive two arrays instead of one?

//With 2 arrays, do we need to use same function twice? No--merge two arrays first
//how to merge two arrays?

const calcTempAmplitudeNew = function (t1, t2) {
    const temps = t1.concat(t2)
    console.log(temps)
    let max = temps[0];
    let min = temps[0];
    for (let i = 0; i < temps.length; i++) {
        const curTemp = temps[i]

        if (typeof curTemp !== 'number') continue;
        if (curTemp > max) max = curTemp;
        if (curTemp < min) min = curTemp;
    }
    console.log(max, min);

    return max - min;
}

const amplitudeNew = calcTempAmplitudeNew([3, 5, 1], [9, 0, 5])
console.log(amplitudeNew)

const measureKelvin = function () {
    const measurement = {
        type: 'temperature',
        unit: "celsius",
        //change value from string to number
        value: 10

    }

    console.table(measurement)
    console.log(measurement.value);
    const kelvin = measurement.value + 273
    return kelvin;

}

console.log(measureKelvin());

const calcTempAmplitudeBug = function (t1, t2) {
    const temps = t1.concat(t2)
    console.log(temps)
    let max = 0;
    let min = 0;//This causes a bug in the program
    for (let i = 0; i < temps.length; i++) {
        const curTemp = temps[i]

        if (typeof curTemp !== 'number') continue;
        if (curTemp > max) max = curTemp;
        if (curTemp < min) min = curTemp;
    }
    console.log(max, min);

    return max - min;
}

const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 3, 5])
console.log(amplitudeBug)

//my solution
const arr1 = [17, 21, 23]
const arr2 = [12, 5, -5, 0, 4]

const printForecast = function (arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(`... ${arr[i]}°C in ${i + 1} days`)
    }
}

printForecast(arr2)

//teachsolution

const data1 = [17, 21, 23]
const data2 = [12, 5, -5, 0, 4]

const printForecastTeacher = function (arr) {
    let str = ''
    for (let i = 0; i < arr.length; i++) {
        str = str + `${arr[i]}°C in ${i + 1} days ... `

    }
    console.log('... ' + str)
}

printForecastTeacher(data2)
*/