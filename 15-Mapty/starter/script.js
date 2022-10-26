'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);
    constructor(coords, distance, duration) {
        this.coords = coords; // [lat,lng]
        this.distance = distance; //in km
        this.duration = duration; //in min
    }

}

class Running extends Workout {
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration)
        this.cadence = cadence
        this.calcPace();
    }
    calcPace() {
        // (min/km)
        this.pace = this.duration / this.distance;
        return this.pace
    }
}

class Cycling extends Workout {
    constructor(coords, distance, duration, speed, elevation) {
        super(coords, distance, duration)
        this.elevation = elevation
        this.calcSpeed();
    }
    calcSpeed() {
        //km/hr
        this.speed = this.distance / (this.duration / 60)
        return this.speed
    }
}

// const run1 = new Running([87, -20], 5.2, 24, 178)
// const cycle1 = new Cycling([87, -20], 27, 95, 523)

// console.log(run1, cycle1);

///////////////////////////////////////
//APPLICATION ARCHITECTURE

class App {
    #map;
    #mapEvent;
    #workouts = [];

    constructor() {
        this._getPosition();
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField);
    }
    _getPosition() {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),
                function () {

                    alert('Could not get your position.')
                }
            );

    }

    _loadMap(position) {
        const { latitude } = position.coords
        const { longitude } = position.coords
        // console.log(latitude, longitude);
        // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

        //L is the Leaflet function

        const coords = [latitude, longitude]
        console.log(this);
        this.#map = L.map('map').setView(coords, 13);

        L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors'
        }).addTo(this.#map);

        // L.marker(coords)
        //     .addTo(map)
        //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        //     .openPopup();


        // handling click on map
        this.#map.on('click', this._showForm.bind(this));
    }


    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');

    }

    _newWorkout(e) {

        const validInputs = (...inputs) =>
            inputs.every(inp => Number.isFinite(inp));
        const isPositive = (...inputs) =>
            inputs.every(inp => inp > 0);


        e.preventDefault();
        //Get data from form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const { lat, lng } = this.#mapEvent.latlng


        //Check if data is valid

        let workout;

        //If activity is running, create running object
        if (type === 'running') {
            const cadence = +inputCadence.value;
            // if (!Number.isFinite(distance) ||
            //     !Number.isFinite(duration) ||
            //     !Number.isFinite(cadence))
            if (!validInputs(distance, duration, cadence) ||
                !isPositive(distance, duration, cadence))
                return alert('Inputs have to be positive numbers!');
            workout = new Running([lat, lng], distance, duration, cadence)

        }
        //If activity is Cycling, create cycling object
        if (type === 'cycling') {
            const elevation = +inputElevation.value;

            if (!validInputs(distance, duration, elevation)
                ||
                !isPositive(distance, duration))
                return alert('Inputs have to be positive numbers!');
            workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        //add new workout to workout array
        this.#workouts.push(workout);
        console.log(workout);
        //render workout on map with marker
        this.renderWorkoutMarker(workout);
        //render workout on list



        //clear input fields

        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';



    }
    renderWorkoutMarker(workout) {
        L.marker([lat, lng])
            .addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                maxHeight: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${type}-popup`,

            }))
            .setPopupContent(workout.distance)
            .openPopup();

    }
}

const app = new App();





