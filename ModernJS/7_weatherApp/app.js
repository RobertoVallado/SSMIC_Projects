class UI {
    constructor() {
        //this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc');
        this.string = document.getElementById('w-string');
        this.details = document.getElementById('w-details');
        this.icon = document.getElementById('w-icon');
    }

    // paint(weather) { //set values 
    //     this.location.textContent = weather.display_location.full;
    //     this.desc.textContent = weather.weather;
    //     this.string.textContent = weather.temperature_string;
    //     this.icon.setAttribute('src', weather.icon_url);
    // }
}

class Weather {
    constructor(city) {
        this.apiKey = '61bd328133cd8f90ff69cfc07d6a714f';
        this.city = city;
    }

    //fetch API
    async getWeather() {
        //const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Boston&appid=${this.apiKey}`)
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`)
        const responseData = await response.json();

        console.log(responseData);
        return responseData;
    }

    //change location
    changeLocation(city) {
        this.city = city;
    }
}

//storage class
class Storage {
    constructor() {
        this.city;
        this.defaultCity = 'Mountain View';
    }

    getLocationData() {
        if (localStorage.getItem('city') === null) {
            this.city = this.defaultCity;
        } else {
            this.city = localStorage.getItem('city');
        }

        return {
            city: this.city
        }
    }

    setLocationData(city) {
        localStorage.setItem('city', city);
    }
}

const storage = new Storage();
const weatherLocation = storage.getLocationData();
const weather = new Weather(weatherLocation.city);
const ui = new UI();

document.addEventListener('DOMContentLoaded', getWeather);

document.getElementById('w-change-btn').addEventListener('click', (e) => {
    const city = document.getElementById('city').value;

    weather.changeLocation(city);
    storage.setLocationData(city);

    getWeather();

    $('#locModal').modal('hide');
});

function getWeather() {
    weather.getWeather()
        .then(results => {
            console.log(results);
            //ui.paint(results);
        })
        .catch(err => console.log(err));
}