import React, { useState } from 'react';
import CountryInfo from './CountryInfo';

const Country = ({ country }) => {
    const [showCountryInfo, setshowCountryInfo] = useState(false);

    const handleShowCountryInfo = () => setshowCountryInfo(!showCountryInfo);

    return (
        <div>
            {country.name.common} <button onClick={handleShowCountryInfo}>{showCountryInfo ? 'hide' : 'show'}</button>
            {showCountryInfo && <CountryInfo country={country} />}
        </div>
    );
};

export default Country;
