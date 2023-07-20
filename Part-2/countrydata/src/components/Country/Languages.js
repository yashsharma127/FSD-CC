import React from 'react';

const Languages = ({ country }) => {
    return (
        <ul>
            {Object.values(country.languages).map((language) => (
                <li key={language}>{language}</li>
            ))}
        </ul>
    );
};

export default Languages;
