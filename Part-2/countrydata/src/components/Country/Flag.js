import React from 'react';

const Flag = ({ country }) => {
    const imgAltText = `Flag of ${country.name.common}`;
    return <img src={country.flags.png} alt={imgAltText} width={200} />;
};

export default Flag;
