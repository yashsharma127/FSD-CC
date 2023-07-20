import React from 'react';

const WeatherIcon = ({ weather }) => {
    const iconURL = `https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`;
    return <img src={iconURL} alt={weather.name} />;
};

export default WeatherIcon;
