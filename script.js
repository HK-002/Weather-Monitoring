// OpenWeatherMap API Key
const apiKey = ''; //API key gets terminated when we add it to github so just generate your api key and you are good to go 

//Cities 
const cities = [
    { name: 'Delhi', id: '1273294' },
    { name: 'Mumbai', id: '1275339' },
    { name: 'Chennai', id: '1264527' },
    { name: 'Bangalore', id: '1277333' },
    { name: 'Kolkata', id: '1275004' },
    { name: 'Hyderabad', id: '1269843' }
];

let weatherData = [];


async function fetchWeatherData(cityId, cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        
        const condition = data.weather[0].main;
        const temperature = data.main.temp;
        const temperatureKelvin = temperature + 273.15; //to Kelvin
        const feelsLike = data.main.feels_like;
        const lastUpdated = new Date(data.dt * 1000).toLocaleTimeString();

        //fetched data
        document.getElementById(`${cityName.toLowerCase()}-condition`).textContent = condition;
        document.getElementById(`${cityName.toLowerCase()}-temp`).textContent = `${temperature}°C`;
        document.getElementById(`${cityName.toLowerCase()}-temp-kelvin`).textContent = `${temperatureKelvin.toFixed(2)}K`; // Display Kelvin
        document.getElementById(`${cityName.toLowerCase()}-feels-like`).textContent = `${feelsLike}°C`;
        document.getElementById(`${cityName.toLowerCase()}-updated`).textContent = lastUpdated;

       
        weatherData.push({ temperature, condition });

        // Calculate summary
        if (weatherData.length === cities.length) {
            calculateSummary(weatherData);
        }

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function fetchWeatherAlerts() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/alerts?appid=${apiKey}`);
        const data = await response.json();

        const alertsContainer = document.getElementById('alerts-container');
        alertsContainer.innerHTML = ''; 

        
        if (data.length === 0) {
            alertsContainer.textContent = 'No weather alerts at this time.';
            return;
        }

        
        data.forEach(alert => {
            const alertItem = document.createElement('div');
            alertItem.className = 'alert';
            alertItem.innerHTML = `<strong>${alert.event}</strong>: ${alert.description}`;
            alertsContainer.appendChild(alertItem);
        });

    } catch (error) {
        console.error('Error fetching weather alerts:', error);
        document.getElementById('alerts-container').textContent = 'Error fetching alerts.';
    }
}


function updateWeatherData() {
    weatherData = []; 
    cities.forEach(city => {
        fetchWeatherData(city.id, city.name);
    });

   
    fetchWeatherAlerts();
}


function calculateSummary(data) {
    const temperatures = data.map(item => item.temperature);
    const conditions = data.map(item => item.condition);

    //Average Temperature
    const avgTemp = (temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length).toFixed(2);
    document.getElementById('avg-temp').textContent = `${avgTemp}°C`;

    //Max Temperature
    const maxTemp = Math.max(...temperatures);
    document.getElementById('max-temp').textContent = `${maxTemp}°C`;

    //Min Temperature
    const minTemp = Math.min(...temperatures);
    document.getElementById('min-temp').textContent = `${minTemp}°C`;

    //Dominant Condition
    const dominantCondition = conditions.sort((a, b) =>
        conditions.filter(cond => cond === a).length - conditions.filter(cond => cond === b).length
    ).pop();
    document.getElementById('dominant-condition').textContent = dominantCondition;


    document.querySelector('.summary').style.display = 'block'; 
}

updateWeatherData();

setInterval(updateWeatherData, 300000);
