document.addEventListener('DOMContentLoaded', function () {
    const openAppButton = document.getElementById('openAppButton');
    const cover = document.querySelector('.cover');
    const appContainer = document.querySelector('.app-container');
    const locationInput = document.querySelector(".input-field");
    const getWeatherButton = document.getElementById("getWeatherButton");
    const descriptionElement = document.getElementById("description");
    const weatherIconElement = document.getElementById("weatherIcon");
    const temperatureElement = document.getElementById("temperature");
    const temperatureIconElement = document.getElementById("temperature-Icon");
    const humidityElement = document.getElementById("humidity");
    const windElement = document.getElementById("wind");
    const celsiusButton = document.getElementById("c_btn");
    const fahrenheitButton = document.getElementById("F_btn");
    const pressureElement = document.getElementById("pressure");
    

    let isCelsius = true; // Flag to track temperature unit

    openAppButton.addEventListener('click', function () {
        cover.style.transform = 'translateX(-100%)';
        appContainer.style.left = '0';
    });

    getWeatherButton.addEventListener('click', function () {
        const apiKey = "8e829a7b5414ec5348b3d17670b87cd0";
        const location = locationInput.value;
        const unit = isCelsius ? 'metric' : 'imperial'; // Use 'metric' for Celsius and 'imperial' for Fahrenheit
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const iconCode = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
                weatherIconElement.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;
                descriptionElement.textContent = data.weather[0].description;

                if (isCelsius) {
                    temperatureElement.textContent = `${data.main.temp}°C`;
                    temperatureIconElement.style.backgroundImage = 'url("temperature.png")';
                    document.getElementById("temp-max").textContent = `Temp Max: ${data.main.temp_max}°C`; // Use the appropriate data property
                    document.getElementById("temp-min").textContent = `Temp Min: ${data.main.temp_min}°C`;

                } else {
                    temperatureElement.textContent = ` ${data.main.temp}°F`;
                    temperatureIconElement.style.backgroundImage = 'url("temperature.png")';
                    document.getElementById("temp-max").textContent = `Temp Max: ${data.main.temp_max}°F`; // Use the appropriate data property
                    document.getElementById("temp-min").textContent = `Temp Min: ${data.main.temp_min}°F`;
                }

                humidityElement.textContent = `${data.main.humidity}%`;
                windElement.textContent = `${data.wind.speed} mph`;
                pressureElement.textContent = `${data.main.pressure} Pa`;
                
            })
            .catch((error) => {
                console.error(error);
                alert("City not found or incorrect. Please check the city name.");
            });
    });

    // Event listener for switching to Celsius
    celsiusButton.addEventListener('click', function () {
        if (!isCelsius) {
            isCelsius = true;
            celsiusButton.style.backgroundColor = 'rgb(68, 68, 68)';
            fahrenheitButton.style.backgroundColor = 'lightgray';
            getWeatherButton.click(); // Fetch weather data with Celsius units
        }
    });

    // Event listener for switching to Fahrenheit
    fahrenheitButton.addEventListener('click', function () {
        if (isCelsius) {
            isCelsius = false;
            fahrenheitButton.style.backgroundColor = 'rgb(68, 68, 68)';
            celsiusButton.style.backgroundColor = 'darkgrey';
            getWeatherButton.click(); // Fetch weather data with Fahrenheit units
        }
    });
});
