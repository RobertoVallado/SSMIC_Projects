class UI {
  constructor() {
    this.location = document.getElementById('w-location'); //location
    this.details = document.getElementById('w-details'); //tempreature details
    this.desc = document.getElementById('w-desc'); //description
    this.icon = document.getElementById('w-icon'); // icon (image?)
  }

  paint(weather) { //set values
    this.location.textContent = weather.name;
    this.details.textContent = `Temperature is ${weather.main.temp} Celcius.`;
    this.desc.textContent = weather.weather[0].description;
    this.icon.setAttribute('src', `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
  }
}

class Weather {
  constructor(city) {
    this.apiKey = ''; //api ky
    //get a key from: https://openweathermap.org/api
    this.city = city;
  }

  //fetch API
  async getWeather() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.apiKey}`)
    const responseData = await response.json();

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
    this.defaultCity = 'Toronto';
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
});

function getWeather() {
  weather.getWeather()
    .then(results => {
      console.log(results)
      ui.paint(results);
    })
    .catch(err => console.log(err));
}
