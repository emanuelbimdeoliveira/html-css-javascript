
// variáveis
let city;
let countryABB = "BR";
let iconName = "01d";

const myKey = "7682f330cc7fe214f54b97cd88840535";

const inputCity = document.querySelector("#input-city");
const searchButton = document.querySelector("#search-button");

const dinamicItems = {
    cityName: document.querySelector("#city-name"),      
    flagName: document.querySelector("#flag-name"),
    temperature: document.querySelector("#temperature"),
    weatherNow: document.querySelector("#weather-now"),
    weatherIcon: document.querySelector("#weather-icon"),
    humidity: document.querySelector("#humidity"),
    windSpeed: document.querySelector("#wind-speed") 
}


// funções
const search = async () => {
    if (inputCity.value !== "") {
        city = inputCity.value;
    } else {
        city = "Brasilia";
    }

    const openWeatherApi = `https://api.openweathermap.org/data/2.5/weather?&q=${city}&units=metric&appid=${myKey}&lang=pt_br`;

    const response = await fetch(`${openWeatherApi}`);
    const apiData = await response.json(); 
    console.log(apiData);

    countryABB = apiData.sys.country;
    const flagApi = `https://flagsapi.com/${countryABB}/shiny/64.png`;

    iconName = apiData.weather[0].icon;
    console.log(apiData.weather[0].icon)
    const iconWeather = `https://openweathermap.org/img/wn/${iconName}.png`; 

    dinamicItems.cityName.textContent = apiData.name;
    dinamicItems.flagName.setAttribute("src", flagApi);
    dinamicItems.temperature.textContent = `${Math.round(apiData.main.temp)}°`;
    dinamicItems.weatherNow.textContent = apiData.weather[0].description;
    dinamicItems.weatherIcon.setAttribute("src", iconWeather);
    dinamicItems.humidity.textContent = `${apiData.main.humidity}%`;
    dinamicItems.windSpeed.textContent = `${apiData.wind.speed}Km/h`;
}

search();


// eventos
searchButton.addEventListener("click", search);