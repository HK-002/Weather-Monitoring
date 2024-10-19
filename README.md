# Weather-Monitoring
In this project, I built a weather monitoring web app called "Weather Monitoring" which provides real-time updates for six major Indian cities: Delhi, Mumbai, Chennai, Bangalore, Kolkata, and Hyderabad. The app pulls weather data from the OpenWeatherMap API, showing key details like the main weather condition, temperature (in both Celsius and Kelvin), "feels like" temperature, and the last updated time. The weather information for each city is automatically refreshed, keeping the display up-to-date.

On the backend, I used the OpenWeatherMap API to fetch the necessary data, while the frontend displays it in real-time using JavaScript's fetch() method. Each city’s weather information is fetched asynchronously and displayed in a dedicated section of the webpage to keep the experience smooth and efficient. I also added logic to generate a daily weather summary, including the average temperature, highs and lows, and the most frequent weather condition. This gives users a clear overview of the day’s weather across all cities.

For responsiveness, I used media queries in CSS to make sure the app works well across different screen sizes. The layout is designed to be flexible, adjusting automatically to ensure everything remains readable and accessible, whether on a desktop or mobile device. The weather data for each city is arranged in a grid, which reshapes itself to suit smaller or larger screens.

Additionally, the app fetches weather alerts from the OpenWeatherMap alerts API, displaying any active warnings or advisories. This feature helps users stay informed about potential weather-related emergencies or disruptions.

In short, this project highlights my ability to work with real-time data, API integration, and responsive design using HTML, CSS, and JavaScript. It provides an easy-to-use, adaptable interface for tracking weather conditions in real time across multiple cities.
