import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherIcon from './WeatherIcon';

const Weather = ({ country }) => {
    const [weather, setWeather] = useState({});
    const [temperature, setTemperature] = useState(0);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_OPEN_WEATHER_API}`;
    useEffect(() => {
        axios.get(url).then((response) => {
            setWeather(response.data);
            // change to F --> C
            setTemperature((((response.data.main.temp - 32) * 5) / 9).toFixed(2));
        });
    }, [url]);

    return (
        <div>
            <h3>Weather in {country.capital}</h3>
            {weather.weather && (
                <div>
                    <div>temperature {temperature}</div>
                    <div>wind {weather.wind.speed} m/s</div>
                    <WeatherIcon weather={weather} />
                </div>
            )}
        </div>
    );
};

export default Weather;
