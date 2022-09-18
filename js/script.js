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

const body = document.querySelector('body');

const showErrorMessage = () => {
    errorMessage.classList.remove('hide');
    weatherData.classList.add('hide');
}

const resetBackground = () => {
    body.style.background = 'linear-gradient(180deg, #594cee 0%, #aaeaff 100%)';
}

const getWeatherData = async (city) => {
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=en`;
    const resp = await fetch(apiWeatherUrl);
    const data = await resp.json();
    return data;
}

const getImage = async (city) => {
    const apiUnsplashUrl = `https://api.unsplash.com/photos/random?query=${city}&orientation=landscape&topics=travel,history&client_id=TEzC0yPI-sdHbnwGSV5xBH1PFRytdPww4KBiK--cGSE`;
    const resp = await fetch(apiUnsplashUrl);
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


const changeBackground = async (city) => {
    try {
        const data = await getImage(city);
        const image = data.urls.regular;
        body.style.background = 'none';
        body.style.backgroundImage = `url(${image})`;
        body.style.backgroundPosition = 'center';
        body.style.backgroundSize = 'cover';
    }
    catch {
        resetBackground();
    }
}



const search = async (e) => {
    try {
        e.preventDefault();
        if (!cityInput.value.trim() == '') {
            const city = cityInput.value;
            await showWeatherData(city);
            await changeBackground(city);
        }
    }
    catch {

    }   
}

searchBtn.addEventListener('click', search);
form.addEventListener('submit', search);
