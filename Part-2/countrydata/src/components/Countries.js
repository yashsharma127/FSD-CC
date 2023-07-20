import React from 'react';
import Country from './Country/Country';
import CountryInfo from './Country/CountryInfo';

const Countries = ({ countries }) => {
    if (countries.length > 10) {
        return <div>Too many matches, specify more.</div>;
    } 
    else if (countries.length === 1) {
        return <CountryInfo country={countries[0]} />;
    }
   
    return (
        <div>{countries.length <= 10 && countries.map((country) => 
            <Country country={country} key={country.name.common} />)
        }</div>
    );
};

export default Countries;
