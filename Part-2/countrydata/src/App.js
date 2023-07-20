import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filtercountry from './components/Filtercountry'

function App() {
    const [countries, setCountries] = useState([])
    const [localStorageKey, setLocalStorageKey] = useState('countriesData')

    useEffect(() => {
      //cache
        if (!!localStorage.getItem(localStorageKey)) {
            console.log('using country data from Storage')
            setCountries(JSON.parse(localStorage.getItem(localStorageKey)))
        } else {
          //fetching data using api
            console.log('Fetching from server')
            axios.get('https://restcountries.com/v3.1/all').then(result => {
                const fetchedCountries = result.data

                console.log('Fetched countries:', fetchedCountries)

                setCountries(fetchedCountries)
                localStorage.setItem(localStorageKey, JSON.stringify(fetchedCountries))
            });
        }
    }, [localStorageKey])

    const [filterName, setFilterName] = useState('')

    //name input handler
    const handleFilterName = (event) => setFilterName(event.target.value)

    //country filter handler case-insesitive
    const countriesFiltered = countries.filter(country => {
        return country.name.common.toLowerCase().includes(filterName.toLowerCase())
    })

    return (
        <>
            <Filtercountry filterName={filterName} onChange={handleFilterName} />
            <div>Filter Name: {filterName}</div>
            <Countries countries={countriesFiltered} />
        </>
    )
}

export default App;
