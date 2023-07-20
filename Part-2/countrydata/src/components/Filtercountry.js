import React from 'react';

const Filter = ({ filterName, onChange }) => {
    return (
        <div>
            find countries
            <input type="text" value={filterName} onChange={onChange} />
        </div>
    );
};

export default Filter;
