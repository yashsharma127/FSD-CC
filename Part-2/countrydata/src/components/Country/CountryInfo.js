import React from 'react';
import Flag from './Flag';
import Languages from './Languages';
import Weather from './Weather';

const CountryInfo = ({ country }) => {
    return (
        <div>
            <h3>{country.name.common}</h3>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <Languages country={country} />
            <Flag country={country} />
            <Weather country={country} />
        </div>
    );
};

export default CountryInfo;
