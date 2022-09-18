const apiKey = '12f27b09220dc8dbfe82eb477351570a';
const countryUrl = 'https://countryflagsapi.com/png/';

const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');
const form = document.querySelector('#form');

const weatherData = document.querySelector('#weather-data');
const cityName = document.querySelector('#city');
const temperature = document.querySelector('#temperature span');
const description = document.querySelector('#description');
const countryFlag = document.querySelector('#country');
const weatherIcon = document.querySelector('#weather-icon');
const humidity = document.querySelector('#humidity span');
const wind = document.querySelector('#wind span');

const errorMessage = document.querySelector('#error-message');

const showErrorMessage = () => {
    errorMessage.classList.remove('hide');
    weatherData.classList.add('hide');
}

const getWeatherData = async (city) => {
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=en`;
    const resp = await fetch(apiWeatherUrl);
    const data = await resp.json();
    return data;
}

const showWeatherData = async (city) => {
    try {
        const data = await getWeatherData(city);
        cityName.innerText = data.name;
        temperature.innerText = Math.round(data.main.temp);
        description.innerText = data.weather[0].description;
        countryFlag.src = countryUrl + data.sys.country;
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        humidity.innerText = data.main.humidity;
        wind.innerText = Math.round(data.wind.speed) + 'km/h';
        weatherData.classList.remove('hide');
        errorMessage.classList.add('hide');
    }
    catch {
        showErrorMessage();
    }
}

const search = (e) => {
    e.preventDefault();
    if (!cityInput.value.trim() == '') {
        const city = cityInput.value;
        showWeatherData(city);
    }
}

searchBtn.addEventListener('click', search);
form.addEventListener('submit', search);
